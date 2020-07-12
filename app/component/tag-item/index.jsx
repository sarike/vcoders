import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class TagItem extends Component {
  handleClick(e, tag) {
    e.stopPropagation();
    e.preventDefault();
    this.props.history.push(`/tag/${tag.id}`);
  }
  render() {
    const { tag, className } = this.props;
    if (!tag) return null;
    return (
      <a
        href="#"
        key={tag.id}
        className={`badge badge-primary ${className}`}
        onClick={(e) => this.handleClick(e, tag)}
      >
        {tag.name} {tag.topicCount ? `- ${tag.topicCount}` : ''}
      </a>
    );
  }
}

TagItem.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.object,
  history: PropTypes.object,
};

TagItem.defaultProps = {
  className: '',
  tag: null,
  history: null,
};

export default withRouter(TagItem);
