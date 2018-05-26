const db = require('../common/database')

module.exports = {
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
