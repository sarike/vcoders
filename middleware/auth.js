exports.loginRequired = (adminRequired = false) => async (ctx, next) => {
    ctx.assert(ctx.isAuthenticated(), 401)
    ctx.assert(!adminRequired || (adminRequired && ctx.req.user.isAdmin), 403)
    await next()
}
