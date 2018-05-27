const Router = require('koa-router')
const config = require('../config')
const db = require('../common/database')
const { loginRequired } = require('../middleware/auth')
const { existed } = require('../middleware/resource')

const topicService = require('../service/topic')
const commentService = require('../service/comment')

const router = new Router({
    prefix: '/api/topic'
})

/** Publish new topic */
router.post('/', loginRequired(), async ctx => {
    const topicData = {
        ...ctx.request.body,
        userId: ctx.req.user.id
    }
    const topic = await topicService.save(topicData, ctx)
    ctx.response.body = topic
})

/** Update topic */
router.put('/:id', loginRequired(), async ctx => {
    const { id } = ctx.params
    const topicData = {
        id,
        ...ctx.request.body
    }
    const topic = await topicService.save(topicData)
    ctx.response.body = topic
})

/** Topic list */
router.get('/', async (ctx, next) => {
    const { page = 1, pageSize = config.topicPageSize } = ctx.query
    const topics = await topicService.list(parseInt(page), pageSize, null, null, { orderByRaw: [ 'isSticked desc, updateTime desc' ] })
    ctx.response.body = topics
})

/** Topic detail */
router.get('/:id', async ctx => {
    const { id } = ctx.params
    const topic = await topicService.view(id)
    ctx.assert(topic, 404)
    ctx.response.body = topic
})

/** Topic detail */
router.post('/:id/stick', loginRequired(true), existed('topic'), async ctx => {
    const topic = ctx.state.currentResource
    const isSticked = topic.isSticked ? 0 : 1
    await db.table('topic').where({ id: topic.id }).update({ isSticked })
    ctx.response.body = {
        id: topic.id,
        isSticked
    }
})

router.delete('/:id', loginRequired(), existed('topic'), async ctx => {
    const id = +ctx.params.id
    const topic = ctx.state.currentResource
    ctx.assert(topic.userId === ctx.req.user.id, 403)
    await db.transaction(async trx => {
        const tagIdQuery = trx.select('tagId').from('topicTag').where('topicId', id)
        await trx.from('tag').whereIn('id', tagIdQuery).decrement('topicCount', 1)
        await trx.from('topic').where('id', id).delete()
        await trx.from('topicTag').where('topicId', id).delete()
    })
    ctx.response.body = { id }
})

/** Comment list of a topic */
router.get('/:id/comment', existed('topic'), async ctx => {
    const topic = ctx.state.currentResource
    const { page = 1, pageSize = config.commentPageSize } = ctx.query
    const where = { topicId: topic.id }
    const orderBy = ['id', 'desc']
    const comments = await commentService.list(page, pageSize, [where], orderBy)
    ctx.response.body = comments
})

/** Add comment to a topic */
router.post('/:id/comment', loginRequired(), existed('topic'), async ctx => {
    const topic = ctx.state.currentResource
    const userId = ctx.req.user.id
    const { content } = ctx.request.body
    const comment = await commentService.create(userId, topic.id, content)
    ctx.response.body = comment
})

module.exports = router
