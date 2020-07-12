const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');

const { cookie, secretKeys } = require('./config');
const passport = require('./common/passport');

const serveStatic = require('./middleware/static');
const errorHandler = require('./middleware/error');
const historyApiFallback = require('./middleware/history-api-fallback');

const topicRouter = require('./router/topic');
const commentRouter = require('./router/comment');
const authRouter = require('./router/auth');
const userRouter = require('./router/user');
const tagRouter = require('./router/tag');

const app = new Koa();

console.info('isDev: ', process.env.NODE_ENV === 'development');

app.keys = secretKeys;

app.use(historyApiFallback());
app.use(errorHandler());
app.use(serveStatic());
app.use(bodyParser());
app.use(session(cookie, app));

app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter.routes());

// api routes
app.use(topicRouter.routes());
app.use(commentRouter.routes());
app.use(userRouter.routes());
app.use(tagRouter.routes());

app.listen(3000, () => console.log('Listening on port 3000'));
