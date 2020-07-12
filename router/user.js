const Router = require('koa-router');
const db = require('../common/database');
const config = require('../config');
const { loginRequired } = require('../middleware/auth');
const { existed } = require('../middleware/resource');
const topicService = require('../service/topic');

const router = Router({
  prefix: '/api/user',
});

router.get('/profile', loginRequired(), async (ctx) => {
  ctx.response.body = ctx.req.user;
});

router.get('/:id', existed('user'), async (ctx) => {
  ctx.response.body = ctx.state.currentResource;
});

router.get('/:id/tag', existed('user'), async (ctx) => {
  const userId = ctx.params.id;
  const tags = await db.from('tag').whereIn('id', function () {
    this.select('tagId').from('userLikeTag').where('userId', userId);
  });
  ctx.response.body = tags;
});

/** like one or more tags */
router.post('/tag', loginRequired(), async (ctx) => {
  const userId = ctx.req.user.id;
  const tagIds = ctx.request.body.tagIds;
  ctx.assert(Array.isArray(tagIds) && tagIds.length > 0, '请选择至少一个要关注的标签');
  const followedTagIds = await db.from('userLikeTag').pluck('tagId').where('userId', userId);
  const validTagIds = await db.pluck('id').from('tag').whereIn('id', tagIds);
  const intersection = validTagIds.filter((id) => followedTagIds.indexOf(id) === -1);
  if (intersection.length === 0) {
    ctx.response.body = [];
  } else {
    await db.transaction(async (trx) => {
      await trx.batchInsert(
        'userLikeTag',
        intersection.map((id) => ({ tagId: id, userId })),
      );
      await trx.table('tag').whereIn('id', intersection).increment('userCount', 1);
    });
    const newLikedTags = await db.from('tag').whereIn('id', intersection);
    ctx.response.body = newLikedTags;
  }
});

/** unlike one or more tags */
router.delete('/tag', loginRequired(), async (ctx) => {
  const userId = ctx.req.user.id;
  const tagIds = ctx.request.body.tagIds;
  ctx.assert(Array.isArray(tagIds) && tagIds.length > 0, '请选择至少一个要取消关注的标签');
  await db.transaction(async (trx) => {
    const count = await trx
      .table('userLikeTag')
      .where('userId', userId)
      .andWhere('tagId', 'in', tagIds)
      .delete();
    if (count > 0) {
      await trx.table('tag').whereIn('id', tagIds).decrement('userCount', 1);
    }
  });
  ctx.response.body = tagIds;
});

router.get('/:id/topic', existed('user'), async (ctx) => {
  const userId = ctx.params.id;
  const { page = 1, pageSize = config.topicPageSize } = ctx.query;
  const order = ['id', 'desc'];
  const topics = await topicService.list(parseInt(page), pageSize, ['userId', userId], order);
  ctx.response.body = topics;
});

router.get('/:id/comment', existed('user'), async (ctx) => {
  const userId = ctx.params.id;
  const comments = await db.from('comment').where('userId', userId);
  ctx.response.body = comments;
});

module.exports = router;
