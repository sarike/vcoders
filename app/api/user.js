import Api from './api'
import { LOAD_USER_PROFILE, LOAD_USER_TOPIC_LIST } from '../redux/type'

export default new Api({
    profile: {
        url: '/api/user/profile',
        actionType: LOAD_USER_PROFILE
    },
    topicList: {
        url: '/api/user/:id/topic',
        actionType: LOAD_USER_TOPIC_LIST
    }
})
