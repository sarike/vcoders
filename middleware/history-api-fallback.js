module.exports = () => async (ctx, next) => {
  const oriURL = ctx.url;
  if (!oriURL.startsWith('/api') && !oriURL.startsWith('/auth') && oriURL.indexOf('.') === -1) {
    ctx.url = '/index.html';
  }
  await next();
  ctx.url = oriURL;
};
