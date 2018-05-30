import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import topicApi from '../api/topic'

import Pagination from '../component/pagination'
import TopicDetail from '../component/topic-detail'
import CommentList from '../component/comment-list'
import CommentForm from '../component/comment-form'

class Detail extends PureComponent {
    componentDidMount () {
        const topicId = this.topicId()
        const { topic } = this.props
        if (!topic || topicId !== topic.id) {
            topicApi.view({ params: { id: topicId } }, { topicId })
        }
        this.loadCommentList()
    }
    toHome () {
        this.props.history.push('/')
    }
    topicId () {
        return parseInt(this.props.match.params.id, 10)
    }
    loadCommentList (page = 1) {
        topicApi.comments({ params: { id: this.topicId() } }, { topicId: this.topicId() })
    }
    handleCommentPageChange (page) {
        this.loadCommentList(page)
    }
    handleViewCommentDetail (comment) {
        this.props.history.push(`/comment/${comment.id}`)
    }
    handleSaveComment (content) {
        const topicId = this.topicId()
        return topicApi.addComment({
            params: { id: topicId },
            data: { content }
        }, { topicId })
    }
    handleStickTopic (topic) {
        return topicApi.stick({
            params: { id: topic.id }
        })
    }
    handleEditTopic (topic) {
        this.props.history.push(`/topic/${topic.id}/edit`)
    }
    render () {
        const { userProfile, topic, topicLoading, commentList, commentListLoading, addNewCommentLoading } = this.props
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <TopicDetail
                            topic={topic}
                            loading={topicLoading}
                            stickable={userProfile && userProfile.isAdmin === 1}
                            editable={topic && userProfile && userProfile.id === topic.userId}
                            onStick={topic => this.handleStickTopic(topic)}
                            onEdit={topic => this.handleEditTopic(topic)}
                        />
                        <div className="mb-3">
                            <CommentList
                                loading={commentListLoading}
                                commentList={commentList.list}
                                onItemClick={comment => this.handleViewCommentDetail(comment)}
                            />
                        </div>
                        {
                            commentList.total > 0 && (
                                <div className="mb-3">
                                    <Pagination
                                        page={commentList.page}
                                        total={commentList.total}
                                        pageSize={commentList.pageSize}
                                        onChangePage={page => this.handleCommentPageChange(page)}
                                    />
                                </div>
                            )
                        }
                        <div className="mb-3">
                            <CommentForm
                                loading={addNewCommentLoading}
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
