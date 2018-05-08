module.exports = () => async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        // will only respond with JSON
        const { message, ...detail } = err
        ctx.status = err.statusCode || err.status || 500
        ctx.body = {
            message,
            detail
        }
    }
}
