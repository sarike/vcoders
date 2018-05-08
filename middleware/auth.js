exports.loginRequired = () => async (ctx, next) => {
    ctx.assert(ctx.isAuthenticated(), 401)
    await next()
}
