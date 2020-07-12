module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // will only respond with JSON
    const { message, statusCode, status, ...detail } = err;
    ctx.status = statusCode || status || 500;
    ctx.body = {
      message,
      detail,
    };
  }
};
