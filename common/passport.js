const passport = require('koa-passport');
const GitHubStrategy = require('passport-github').Strategy;
const { githubAuth } = require('../config');
const db = require('./database');

passport.use(
  new GitHubStrategy(githubAuth, async function (accessToken, refreshToken, profile, done) {
    const user = await db.from('user').where('github', profile.id).first();
    if (!user) {
      const userData = {
        github: profile.id,
        userName: profile.username,
        nickName: profile.displayName,
        avatarURL: profile._json.avatar_url,
        email: profile.emails && profile.emails[0] && profile.emails[0].value,
      };
      try {
        const insertId = await db.insert(userData).into('user');
        const user = await db.from('user').where('id', insertId).first();
        if (user) {
          return done(null, user);
        }
        return done(new Error('user is not existed.'), null);
      } catch (e) {
        return done(e, null);
      }
    } else {
      const userData = {
        updateTime: new Date(),
        github: profile.id,
        userName: profile.username,
        nickName: profile.displayName,
        avatarURL: profile._json.avatar_url,
        email: (profile.emails && profile.emails[0] && profile.emails[0].value) || user.email,
      };
      try {
        await db.table('user').where('github', profile.id).update(userData);
        return done(null, {
          ...user,
          ...userData,
        });
      } catch (e) {
        return done(e, null);
      }
    }
  }),
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (user, done) {
  const userData = await db.from('user').where('id', user.id).first();
  done(null, userData);
});

module.exports = passport;
