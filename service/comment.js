const { sanitize } = require('sanitizer');
const db = require('../common/database');
const validate = require('../common/validate');
const commentRules = require('../common/validation/comment');

module.exports = {
  async list(page, pageSize, whereArgs, orderArgs) {
    const comments = await db.page('comment', page, pageSize, whereArgs, orderArgs);
    const total = await db.total('comment', whereArgs);
    const userIds = comments.map((c) => c.userId);
    const users = await db.from('user').whereIn('id', userIds);
    const list = comments.map((c) => ({
      ...c,
      user: users.find((u) => u.id === c.userId),
    }));
    return {
      list,
      total,
      page,
      pageSize,
    };
  },
  async view(id, withParent = false) {
    const comment = await db.view('comment', id);
    if (!comment) return null;
    const user = await db.from('user').where('id', comment.userId).first();
    let parent = null;
    if (withParent && comment.parentId !== 0) {
      parent = await this.view(comment.parentId);
    }
    return {
      ...comment,
      user,
      parent,
    };
  },

  async create(userId, topicId, content, parentId = 0) {
    const { isValid, errors } = validate({ content }, commentRules);
    if (!isValid) {
      const error = new Error();
      error.validateErrors = errors;
      throw error;
    }
    const safeContent = sanitize(content);
    let validParentId = parentId;
    if (parentId) {
      const parentComment = await db.from('comment').where('id', parentId).first('id');
      if (!parentComment) {
        validParentId = 0;
      }
    }
    const commentData = {
      parentId: validParentId,
      content: safeContent,
      topicId,
      userId,
    };
    const newCommentId = await db.insert(commentData).into('comment');
    const newComment = await module.exports.view(newCommentId);
    return newComment;
  },
};
