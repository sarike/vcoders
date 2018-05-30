import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { formatDatetime, parseMarkdown } from '../../util'
import './comment-detail.scss'

export default class CommentDetail extends PureComponent {
    handleViewTopicDetail (e, topic) {
        e.preventDefault()
        this.props.onViewTopicDetail(topic)
    }
    handleViewParentComment (e, comment) {
        e.preventDefault()
        this.props.onViewParentComment(comment)
    }
    renderComment () {
        const { comment } = this.props
        if (!comment) return '未获取到评论详情...'
        const { topic, parent, content, user, createTime } = comment
        return (
            <div>
                <div className="mb-3" dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} />
                <div className="mb-3" >
                    <small><a href="#">{user && user.nickName}</a> 评论于 {formatDatetime(createTime)}</small>
                </div>
                {
                    parent && (
                        <div className="origin-comment p-3 mb-3 rounded">
                            <a href="#" onClick={e => this.handleViewParentComment(e, parent)}>
                                原评论：{parent.content}
                            </a>
                            <div>
                                <small>由 {parent.user.nickName} 评论于 {formatDatetime(parent.createTime)}</small>
                            </div>
                        </div>
                    )
                }
                <div className="origin-topic p-3 rounded">
                    <a href="#" onClick={e => this.handleViewTopicDetail(e, topic)}>
                        原主题：{topic.title}
                    </a>
                    <div>
                        <small>由 {topic.user.nickName} 发布于 {formatDatetime(topic.createTime)}</small>
                    </div>
                </div>
            </div>
        )
    }
    render () {
        const { loading } = this.props
        return (
            <div className="card mb-3 comment-detail">
                <div className="card-body">
                    { loading ? '正在加载评论详情...' : this.renderComment()}
                </div>
            </div>
        )
    }
}

CommentDetail.propTypes = {
    loading: PropTypes.bool,
    comment: PropTypes.object,
    onViewTopicDetail: PropTypes.func,
    onViewParentComment: PropTypes.func
}

CommentDetail.defaultProps = {
    loading: false,
    comment: null,
    onViewTopicDetail: () => null,
    onViewParentComment: () => null
}
