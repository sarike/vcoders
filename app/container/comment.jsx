import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import commentApi from '../api/comment'

import Pagination from '../component/pagination'
import CommentDetail from '../component/comment-detail'
import CommentList from '../component/comment-list'
import CommentForm from '../component/comment-form'

class Detail extends PureComponent {
    componentDidMount () {
        const commentId = this.commentId()
        const { comment } = this.props
        if (!comment || commentId !== comment.id) {
            commentApi.view({ params: { id: commentId } }, { commentId })
        }
        this.loadReplies()
    }
    componentDidUpdate () {
        const { comment, commentLoading } = this.props
        if ((!comment || comment.id !== this.commentId()) && !commentLoading) {
            const commentId = this.commentId()
            commentApi.view({ params: { id: commentId } }, { commentId })
            this.loadReplies()
        }
    }
    toHome () {
        this.props.history.push('/')
    }
    commentId () {
        return parseInt(this.props.match.params.id, 10)
    }
    loadReplies (page = 1) {
        commentApi.replies({ params: { id: this.commentId() } }, { commentId: this.commentId() })
    }
    handleCommentPageChange (page) {
        this.loadCommentList(page)
    }
    handleViewCommentDetail (comment) {
        this.props.history.push(`/comment/${comment.id}`)
    }
    handleViewTopicDetail (topic) {
        this.props.history.push(`/topic/${topic.id}`)
    }
    handleSaveComment (content) {
        const commentId = this.commentId()
        return commentApi.addReply({
            params: { id: commentId },
            data: { content }
        }, { commentId })
    }
    render () {
        const { comment, replyList, commentLoading, replyListLoading, addNewReplyLoading } = this.props
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <CommentDetail
                            loading={commentLoading}
                            comment={comment}
                            onViewParentComment={comment => this.handleViewCommentDetail(comment)}
                            onViewTopicDetail={topic => this.handleViewTopicDetail(topic)}
                        />
                        <div className="mb-3">
                            <CommentList
                                loading={replyListLoading}
                                commentList={replyList.list}
                                onItemClick={comment => this.handleViewCommentDetail(comment)}
                            />
                        </div>
                        {
                            replyList.total > 0 && (
                                <div className="mb-3">
                                    <Pagination
                                        page={replyList.page}
                                        total={replyList.total}
                                        pageSize={replyList.pageSize}
                                        onChangePage={page => this.handleCommentPageChange(page)}
                                    />
                                </div>
                            )
                        }
                        <div className="mb-3">
                            <CommentForm
                                loading={addNewReplyLoading}
                                onSave={comment => this.handleSaveComment(comment)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state)(Detail)
