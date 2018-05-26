import { handleAction } from '../util'
import {
    CREATE_TOPIC,
    VIEW_TOPIC_DETAIL,
    LOAD_TOPIC_DETAIL,
    LOAD_TOPIC_LIST,
    LOAD_COMMENT_LIST,
    ADD_COMMENT,
    ADD_REPLY,
    LOAD_COMMENT_DETAIL,
    LOAD_TAG_LIST,
    LOAD_USER_PROFILE,
    LOAD_REPLY_LIST,
    LOAD_TAG_TOPIC_LIST,
    LOAD_TAG_DETAIL,
    VIEW_TAG_DETAIL,
    LOAD_USER_TOPIC_LIST,
    STICK_TOPIC
} from './type'

const initialState = {
    currentTopicId: null,
    currentCommentId: null,
    currentTagId: null,

    topic: null,
    topicLoading: false,
    topicList: null,
    topicListLoading: false,
    topicPublishLoading: false,

    comment: null,
    commentList: {},
    commentLoading: false,
    commentListLoading: false,
    addNewCommentLoading: false,

    replyList: {},
    replyListLoading: false,
    addNewReplyLoading: false,

    tag: null,
    tagLoading: false,
    tagList: [],
    tagListLoading: false,
    tagTopicList: null,
    tagTopicListLoading: false,

    userProfile: {},
    userTopicList: null,
    userTopicListLoading: false
}

export default handleAction({
    [CREATE_TOPIC]: {
        pre: state => ({
            ...state,
            topicPublishLoading: true
        }),
        complete: (state) => ({
            ...state,
            topicPublishLoading: false
        })
    },
    [LOAD_TOPIC_LIST]: {
        pre: state => ({
            ...state,
            topicListLoading: true
        }),
        success: (state, action) => ({
            ...state,
            topicList: action.payload
        }),
        complete: state => ({
            ...state,
            topicListLoading: false
        })
    },
    [STICK_TOPIC]: {
        success: (state, action) => {
            const topicId = action.payload.id
            console.info(state.topic, state.currentTopicId, action.payload)
            return {
                ...state,
                topicList: state.topicList
                    ? ({
                        ...state.topicList,
                        list: state.topicList.list.map(topic => {
                            if (topic.id === topicId) {
                                return { ...topic, isSticked: action.payload.isSticked }
                            }
                            return topic
                        })
                    })
                    : state.topicList,
                topic: topicId === state.currentTopicId && state.topic
                    ? ({ ...state.topic, isSticked: action.payload.isSticked })
                    : state.topic
            }
        }
    },
    [ADD_COMMENT]: {
        pre: state => ({
            ...state,
            addNewCommentLoading: true
        }),
        success: (state, action) => {
            if (state.currentTopicId !== action.meta.topicId) return state
            return {
                ...state,
                commentList: {
                    ...state.commentList,
                    total: state.commentList.total + 1,
                    list: [action.payload, ...(state.commentList.list || [])]
                }
            }
        },
        complete: (state, action) => {
            return {
                ...state,
                addNewCommentLoading: false
            }
        }
    },
    [ADD_REPLY]: {
        pre: state => ({
            ...state,
            addNewReplyLoading: true
        }),
        success: (state, action) => {
            if (state.currentCommentId !== action.meta.commentId) return state
            return {
                ...state,
                replyList: {
                    ...state.replyList,
                    total: state.replyList.total + 1,
                    list: [action.payload, ...(state.replyList.list || [])]
                }
            }
        },
        complete: (state, action) => {
            return {
                ...state,
                addNewReplyLoading: false
            }
        }
    },
    [VIEW_TOPIC_DETAIL]: (state, action) => {
        return {
            ...state,
            topic: action.payload,
            currentTopicId: action.payload.id,
            commentList: action.payload.id !== state.currentTopicId ? [] : state.commentList
        }
    },
    [LOAD_TOPIC_DETAIL]: {
        pre: (state, action) => {
            return {
                ...state,
                topic: null,
                topicLoading: true,
                currentTopicId: action.meta.topicId
            }
        },
        success: (state, action) => ({
            ...state,
            topic: action.payload
        }),
        complete: (state, action) => ({
            ...state,
            topicLoading: false
        })
    },
    [LOAD_COMMENT_LIST]: {
        pre: (state, action) => ({
            ...state,
            commentListLoading: true,
            commentList: state.currentTopicId !== action.meta.topicId ? {} : state.commentList
        }),
        success: (state, action) => {
            if (state.currentTopicId !== action.meta.topicId) return state
            return {
                ...state,
                commentList: action.payload
            }
        },
        complete: (state, action) => {
            return {
                ...state,
                commentListLoading: false
            }
        }
    },
    [LOAD_COMMENT_DETAIL]: {
        pre: (state, action) => {
            return {
                ...state,
                comment: null,
                commentLoading: true,
                currentCommentId: action.meta.commentId,
                replyList: state.currentCommentId !== action.meta.commentId ? [] : state.replyList
            }
        },
        success: (state, action) => {
            if (state.currentCommentId !== action.meta.commentId) return state
            return {
                ...state,
                comment: action.payload
            }
        },
        complete: (state, action) => ({
            ...state,
            commentLoading: false
        })
    },
    [LOAD_REPLY_LIST]: {
        pre: state => ({
            ...state,
            replyListLoading: true
        }),
        success: (state, action) => {
            if (state.currentCommentId !== action.meta.commentId) return state
            return {
                ...state,
                replyList: action.payload
            }
        },
        complete: (state, action) => {
            if (state.currentCommentId !== action.meta.commentId) return state
            return {
                ...state,
                replyListLoading: false
            }
        }
    },
    [VIEW_TAG_DETAIL]: (state, action) => ({
        ...state,
        tag: action.payload,
        currentTagId: action.payload.id,
        tagTopicList: state.currentTagId !== action.payload.id ? null : state.tagTopicList
    }),
    [LOAD_TAG_DETAIL]: {
        pre: (state, action) => ({
            ...state,
            tagLoading: true,
            currentTagId: action.meta.tagId,
            tagTopicList: state.currentTagId !== action.meta.tagId ? null : state.tagTopicList
        }),
        success: (state, action) => {
            if (state.currentTagId !== action.meta.tagId) return state
            return {
                ...state,
                tag: action.payload
            }
        },
        complete: (state) => ({
            ...state,
            tagLoading: false
        })
    },
    [LOAD_TAG_LIST]: {
        pre: (state, action) => ({
            ...state,
            tagListLoading: true
        }),
        success: (state, action) => ({
            ...state,
            tagList: action.payload
        }),
        complete: (state, action) => ({
            ...state,
            tagListLoading: false
        })
    },
    [LOAD_TAG_TOPIC_LIST]: {
        pre: (state, action) => ({
            ...state,
            tagTopicListLoading: true,
            currentTagId: action.meta.tagId
        }),
        success: (state, action) => {
            if (action.meta.tagId !== state.currentTagId) return state
            return {
                ...state,
                tagTopicList: action.payload
            }
        },
        complete: (state, action) => ({
            ...state,
            tagTopicListLoading: false
        })
    },
    [LOAD_USER_PROFILE]: {
        success: (state, action) => ({
            ...state,
            userProfile: action.payload
        }),
        error: (state) => ({
            ...state,
            userProfile: null
        })
    },
    [LOAD_USER_TOPIC_LIST]: {
        pre: state => ({
            ...state,
            userTopicListLoading: true
        }),
        success: (state, action) => ({
            ...state,
            userTopicList: action.payload
        }),
        complete: state => ({
            ...state,
            userTopicListLoading: false
        })
    }
}, initialState)
