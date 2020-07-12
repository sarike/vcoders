import { LOAD_TAG_LIST, LOAD_TAG_TOPIC_LIST, LOAD_TAG_DETAIL } from '../redux/type';
import Api from './api';

export default new Api({
  list: {
    url: '/api/tag',
    actionType: LOAD_TAG_LIST,
  },
  view: {
    url: '/api/tag/:id',
    actionType: LOAD_TAG_DETAIL,
  },
  topicList: {
    url: '/api/tag/:id/topic',
    actionType: LOAD_TAG_TOPIC_LIST,
  },
});
