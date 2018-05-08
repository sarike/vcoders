const Router = require('koa-router')
const db = require('../common/database')
const config = require('../config')
const topicService = require('../service/topic')

async function tagExisted (ctx, next) {
    const tag = db.from('tag').where('id', ctx.params.id)
    ctx.assert(tag, 400)
    await next()
}

const router = new Router({
    prefix: '/api/tag'
})

router.get('/', async ctx => {
    const { count = 10 } = ctx.query
    const tags = await db.from('tag').orderBy('topicCount', 'desc').limit(parseInt(count))
    ctx.response.body = tags
})

router.get('/:id', async ctx => {
    const tagId = ctx.params.id
    const tags = await db.from('tag').where('id', tagId)
    ctx.assert(tags.length > 0, 404)
    ctx.response.body = tags[0]
})

router.get('/:id/topic', tagExisted, async ctx => {
    const tagId = ctx.params.id
    const { page = 1, pageSize = config.topicPageSize } = ctx.query
    const topciIds = db.select('topicId').from('topicTag').where('tagId', tagId)
    const topics = await topicService.list(page, pageSize, ['id', 'in', topciIds], ['id', 'desc'])
    ctx.response.body = topics
})

module.exports = router
