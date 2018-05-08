import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommentItem from '../comment-item'

class CommentList extends Component {
    renderCommentList () {
        const { loading, commentList, onItemClick } = this.props
        if (loading && commentList.length === 0) {
            return (
                <div className="card">
                    <div className="card-body">正在加载评论列表...</div>
                </div>
            )
        }
        if (commentList.length === 0) {
            return (
                <div className="card">
                    <div className="card-body">还没有评论，快来抢沙发吧</div>
                </div>
            )
        }
        return commentList.map(item => (
            <CommentItem
                key={item.id}
                comment={item}
                onClick={comment => onItemClick(comment)}
            />
        ))
    }
    render () {
        return (
            <div className="comment-list">
                <div className="mb-2">
                    <strong>评论列表</strong>
                </div>
                {this.renderCommentList()}
            </div>
        )
    }
}

CommentList.propTypes = {
    loading: PropTypes.bool,
    commentList: PropTypes.array,
    onItemClick: PropTypes.func
}

CommentList.defaultProps = {
    loading: false,
    commentList: [],
    onItemClick: () => null
}

export default CommentList
