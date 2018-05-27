const db = require('../common/database')

exports.existed = (table, isOwner = false) => async (ctx, next) => {
    const resource = await db.from(table).where('id', ctx.params.id).first()
    ctx.assert(resource, 404)
    ctx.assert(!isOwner || (isOwner && resource.userId === ctx.req.user.id), 403)
    ctx.state.currentResource = resource
    await next()
}
