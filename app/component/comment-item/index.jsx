import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDatetime, parseMarkdown } from '../../util';

import './comment-item.less';

class CommentItem extends Component {
  handleClick(e, comment) {
    e.preventDefault();
    this.props.onClick(comment);
  }

  render() {
    const { comment } = this.props;
    if (!comment) return null;
    return (
      <div className="comment-item list-group-item list-group-item-action flex-column">
        <div className="d-flex w-100 align-items-center mb-3">
          <small className="flex-grow-1">
            <a href="#">{comment.user.nickName}</a> 发布于 {formatDatetime(comment.createTime)}
          </small>
          <span>
            <a href="#" onClick={(e) => this.handleClick(e, comment)}>
              <small>楼层链接</small>
            </a>
          </span>
        </div>
        <p dangerouslySetInnerHTML={{ __html: parseMarkdown(comment.content) }} className="mb-1" />
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object,
  onClick: PropTypes.func,
};

CommentItem.defaultProps = {
  comment: null,
  onClick: () => null,
};

export default CommentItem;
