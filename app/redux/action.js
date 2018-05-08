import {
    VIEW_TOPIC_DETAIL,
    VIEW_COMMENT_DETAIL,
    VIEW_TAG_DETAIL
} from './type'

export function viewTopicDetail (topic) {
    return {
        type: VIEW_TOPIC_DETAIL,
        payload: topic
    }
}

export function viewCommentDetail (comment) {
    return {
        type: VIEW_COMMENT_DETAIL,
        payload: comment
    }
}

export function viewTagDetail (tag) {
    return {
        type: VIEW_TAG_DETAIL,
        payload: tag
    }
}
