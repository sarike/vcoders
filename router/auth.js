const Router = require('koa-router');
const passport = require('../common/passport');

const router = new Router({
  prefix: '/auth',
});

router.get('/logout', (ctx) => {
  ctx.logout();
  ctx.response.body = 'Bye.';
});

router.get('/github', passport.authenticate('github', { scope: ['user'] }));
router.get('/github/callback', passport.authenticate('github'), (ctx) => {
  ctx.redirect('/');
});

module.exports = router;
