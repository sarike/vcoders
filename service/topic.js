const db = require('../common/database')
const { sanitize } = require('sanitizer')
const constant = require('../common/constant')
const validate = require('../common/validate')
const topicRules = require('../common/validation/topic')

module.exports = {
    async save (topic) {
        const isEditing = !!topic.id
        const originalTopic = isEditing ? await module.exports.view(topic.id) : null
        if (isEditing && !originalTopic) {
            const error = new Error('Not Found')
            error.code = 404
            throw error
        }
        const { isValid, data, errors } = validate(topic, topicRules)
        if (!isValid) {
            const error = new Error('Bad Request')
            error.status = 400
            Object.assign(error, errors)
            throw error
        }
        const { title, userId, content, tags = [], newTags = [] } = data
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
        if (tagIds.length === 0 && tagToCreate.length === 0) {
            const error = new Error('Bad Request')
            error.status = 400
            error.tags = ['请至少指定一个标签']
            throw error
        }
        const topicData = {
            title,
            userId,
            content: sanitize(content),
            status: constant.TOPIC_STATUS_APPROVED
        }
        const topicId = await db.transaction(async trx => {
            if (tagToCreate.length > 0) {
                for (let i = 0; i < tagToCreate.length; i++) {
                    const tagId = await trx.insert({ name: tagToCreate[i] }).into('tag')
                    tagIds = tagIds.concat(tagId)
                }
            }
            const tagToUnlink = isEditing
                ? originalTopic.tags.map(t => t.id).filter(tId => tagIds.indexOf(tId) === -1)
                : []
            const tagToLink = isEditing
                ? tagIds.filter(tId => !originalTopic.tags.find(tag => tag.id === tId))
                : tagIds
            let topicId
            if (isEditing) {
                topicId = topic.id
                await trx.table('topic').update(topicData).where('id', topicId)
            } else {
                topicId = await trx
                    .insert(topicData)
                    .into('topic')
            }
            if (tagToUnlink.length > 0) {
                await trx.table('topicTag').where({ topicId }).whereIn('tagId', tagToUnlink).del()
                await trx.table('tag').whereIn('id', tagToUnlink).decrement('topicCount', 1)
            }
            if (tagToLink.length > 0) {
                await trx.table('tag').whereIn('id', tagToLink).increment('topicCount', 1)
                await trx.batchInsert('topicTag', Array.from(new Set(tagToLink)).map(id => ({ tagId: id, topicId })))
            }
            return topicId
        })
        const nextTopic = await module.exports.view(topicId)
        return nextTopic
    },
    async list (page, pageSize, whereArgs, orderByArgs, otherArgs) {
        const topics = await db.page('topic', page, pageSize, whereArgs, orderByArgs, otherArgs)
        const topicIds = []
        const userIds = []
        topics.forEach(t => {
            topicIds.push(t.id)
            userIds.push(t.userId)
        })
        const tags = await db
            .from('tag')
            .select({
                id: 'tag.id',
                name: 'tag.name',
                topicId: 'topicTag.topicId'
            })
            .innerJoin('topicTag', 'topicTag.tagId', 'tag.id')
            .whereIn('topicTag.topicId', topicIds)
        const users = await db
            .from('user')
            .whereIn('id', userIds)
        const total = await db.total('topic', whereArgs)
        return {
            list: topics.map(t => ({
                ...t,
                tags: tags
                    .filter(tag => tag.topicId === t.id)
                    .map(({ id, name }) => ({ id, name })),
                user: users.find(u => u.id === t.userId)
            })),
            total,
            page,
            pageSize
        }
    },

    async view (id) {
        const topic = await db.view('topic', id)
        if (!topic) return null
        const tags = await db
            .from('tag')
            .select('tag.*')
            .innerJoin('topicTag', 'topicTag.tagId', 'tag.id')
            .where('topicTag.topicId', id)
        const user = await db
            .from('user')
            .where('id', topic.userId)
        return {
            ...topic,
            user: user[0],
            tags
        }
    }
}
