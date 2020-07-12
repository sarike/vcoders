const Router = require('koa-router');
const config = require('../config');
const { existed } = require('../middleware/resource');
const { loginRequired } = require('../middleware/auth');
const commentService = require('../service/comment');
const topicService = require('../service/topic');

const router = new Router({
  prefix: '/api/comment',
});

/** Get comment detail */
router.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  const comment = await commentService.view(id, true);
  const topic = await topicService.view(comment.topicId);
  ctx.assert(comment, 404);
  ctx.response.body = {
    ...comment,
    topic,
  };
});

router.get('/:id/replies', existed('comment'), async (ctx) => {
  const { id } = ctx.params;
  const { page = 1, pageSize = config.commentPageSize } = ctx.query;
  const comment = ctx.state.currentResource;
  const where = {
    topicId: comment.topicId,
    parentId: id,
  };
  const orderBy = ['id', 'desc'];
  const replies = await commentService.list(page, pageSize, [where], orderBy);
  ctx.response.body = replies;
});

router.post('/:id/reply', loginRequired(), existed('comment'), async (ctx) => {
  const { id } = ctx.params;
  const targetComment = ctx.state.currentResource;
  const topicId = targetComment.topicId;
  const userId = ctx.req.user.id;
  const { content } = ctx.request.body;
  const comment = await commentService.create(userId, topicId, content, id);
  ctx.response.body = comment;
});

module.exports = router;
