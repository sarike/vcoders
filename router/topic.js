const Router = require('koa-router')
const { sanitize } = require('sanitizer')
const config = require('../config')
const constant = require('../common/constant')
const db = require('../common/database')
const validate = require('../common/validate')
const topicRules = require('../common/validation/topic')
const { loginRequired } = require('../middleware/auth')
const { existed } = require('../middleware/resource')

const topicService = require('../service/topic')
const commentService = require('../service/comment')

const router = new Router({
    prefix: '/api/topic'
})

/** Publish new topic */
router.post('/', loginRequired(), async ctx => {
    const { isValid, data, errors } = validate(ctx.request.body, topicRules)
    ctx.assert(isValid, 400, errors)
    const { title, content, tags = [], newTags = [] } = data
    // 选择的 Tag ID 列表
    let tagIds = []
    let tagToCreate = []
    if (tags.length > 0) {
        const existedTagIds = await db
            .pluck('id')
            .from('tag')
            .whereIn('id', tags)
        tagIds = tagIds.concat(existedTagIds)
    }
    if (newTags.length > 0) {
        const existedTags = await db
            .from('tag')
            .whereIn('name', newTags)
        tagIds = tagIds.concat(existedTags.map(t => t.id))
        const existedTagNames = existedTags.map(t => t.name)
        tagToCreate = newTags.filter(n => !existedTagNames.includes(n))
    }
    ctx.assert(tagIds.length > 0 || tagToCreate.length > 0, 400, { tags: '请为主题设置一个标签' })
    const topicData = {
        title,
        userId: ctx.req.user.id,
        content: sanitize(content),
        status: constant.TOPIC_STATUS_APPROVED
    }
    const topicId = await db.transaction(async trx => {
        if (tagToCreate.length > 0) {
            const newTagIds = await trx
                .batchInsert('tag', tagToCreate.map(t => ({ name: t })))
            tagIds = tagIds.concat(newTagIds)
        }
        const insertId = await trx
            .insert(topicData)
            .into('topic')
        await trx.table('tag').whereIn('id', tagIds).increment('topicCount', 1)
        await trx.batchInsert(
            'topicTag',
            Array.from(new Set(tagIds)).map(id => ({ tagId: id, topicId: insertId }))
        )
        return insertId
    })
    const topic = await db.from('topic').where('id', topicId).first()
    const topicTags = await db.from('tag').whereIn('id', tagIds)
    ctx.response.body = {
        ...topic,
        user: ctx.user,
        tags: topicTags
    }
})

/** Topic list */
router.get('/', async (ctx, next) => {
    const { page = 1, pageSize = config.topicPageSize } = ctx.query
    const order = ['id', 'desc']
    const topics = await topicService.list(parseInt(page), pageSize, null, order)
    ctx.response.body = topics
})

/** Topic detail */
router.get('/:id', async ctx => {
    const { id } = ctx.params
    const topic = await topicService.view(id)
    ctx.assert(topic, 404)
    ctx.response.body = topic
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
