const db = require('../common/database')

exports.existed = (table) => async (ctx, next) => {
    const resource = await db.from(table).where('id', ctx.params.id).first()
    ctx.assert(resource, 404)
    ctx.state.currentResource = resource
    await next()
}
