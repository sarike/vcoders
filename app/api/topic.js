import {
  CREATE_TOPIC,
  UPDATE_TOPIC,
  STICK_TOPIC,
  LOAD_TOPIC_LIST,
  LOAD_TOPIC_DETAIL,
  LOAD_COMMENT_LIST,
  ADD_COMMENT,
} from '../redux/type';
import Api from './api';

export default new Api({
  create: {
    url: '/api/topic',
    method: 'post',
    actionType: CREATE_TOPIC,
  },
  update: {
    url: '/api/topic/:id',
    method: 'put',
    actionType: UPDATE_TOPIC,
  },
  list: {
    url: '/api/topic',
    actionType: LOAD_TOPIC_LIST,
  },
  view: {
    url: '/api/topic/:id',
    actionType: LOAD_TOPIC_DETAIL,
  },
  comments: {
    url: '/api/topic/:id/comment',
    actionType: LOAD_COMMENT_LIST,
  },
  addComment: {
    method: 'post',
    url: '/api/topic/:id/comment',
    actionType: ADD_COMMENT,
  },
  stick: {
    method: 'post',
    url: '/api/topic/:id/stick',
    actionType: STICK_TOPIC,
  },
});
