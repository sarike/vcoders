import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TagItem from '../tag-item';

class Tags extends Component {
  handleTagItemClick(e, tag) {
    e.preventDefault();
    this.props.onTagClick(tag);
  }
  render() {
    const { tags, loading } = this.props;
    if (loading && tags.length === 0) return '正在加载标签列表...';
    if (tags.length === 0) return '没有标签。';
    return (
      <div className="tags">
        {this.props.tags.map((tag) => (
          <TagItem key={tag.id} className="mr-1" tag={tag} />
        ))}
      </div>
    );
  }
}

Tags.propTypes = {
  tags: PropTypes.array,
  loading: PropTypes.bool,
  onTagClick: PropTypes.func,
};

Tags.defaultProps = {
  tags: [],
  loading: false,
  onTagClick: () => null,
};

export default Tags;
