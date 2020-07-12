import { LOAD_REPLY_LIST, ADD_REPLY, LOAD_COMMENT_DETAIL } from '../redux/type';
import Api from './api';

export default new Api({
  view: {
    url: '/api/comment/:id',
    actionType: LOAD_COMMENT_DETAIL,
  },
  replies: {
    url: '/api/comment/:id/replies',
    actionType: LOAD_REPLY_LIST,
  },
  addReply: {
    method: 'post',
    url: '/api/comment/:id/reply',
    actionType: ADD_REPLY,
  },
});
