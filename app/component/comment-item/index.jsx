import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDatetime } from '../../util'

import './comment-item.scss'

class CommentItem extends Component {
    render () {
        const { comment } = this.props
        if (!comment) return null
        return (
            <div onClick={() => this.props.onClick(comment)} className="comment-item list-group-item list-group-item-action flex-column">
                <div className="d-flex w-100 align-items-center mb-3">
                    <img src={comment.user.avatarURL} alt={comment.user.nickName} className="avatar mr-2" />
                    <small><a href="#">{comment.user.nickName}</a> 发布于 {formatDatetime(comment.createTime)}</small>
                </div>
                <p className="mb-1">{comment.content}</p>
            </div>

        )
    }
}

CommentItem.propTypes = {
    comment: PropTypes.object,
    onClick: PropTypes.func
}

CommentItem.defaultProps = {
    comment: null,
    onClick: () => null
}

export default CommentItem
