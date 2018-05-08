import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TagItem from '../tag-item'
import Pagination from '../pagination'
import { formatDatetime } from '../../util'
import './topic-list.scss'

export default class TopicList extends PureComponent {
    handleClickTopicItem (topic) {
        this.props.onViewDetail(topic)
    }
    renderEmpty (message) {
        return (
            <div className="card">
                <div className="card-body">
                    {message}
                </div>
            </div>
        )
    }
    render () {
        const { data, loading } = this.props
        if (loading && !data) return this.renderEmpty('正在加载主题列表...')
        if (!data || data.list.length === 0) return this.renderEmpty('暂时没有主题...')
        return (
            <div>
                <div className="list-group topic-list">
                    {
                        data.list.map(topic => (
                            <div
                                key={topic.id}
                                className="list-group-item list-group-item-action d-flex flex-row align-items-center"
                                onClick={() => this.handleClickTopicItem(topic)}
                            >
                                <div className="avatar pr-3">
                                    <img
                                        className="rounded"
                                        src={topic.user.avatarURL}
                                        alt={topic.user.nickName}
                                    />
                                </div>
                                <div className="content">
                                    <h5 className="mb-1">{topic.title}</h5>
                                    <div className="tags">
                                        {
                                            topic.tags.map(tag => <TagItem key={tag.id} className="mr-1" tag={tag} />)
                                        }
                                    </div>
                                    <small>
                                        <a href={`user/${topic.user.id}`}>{topic.user.nickName}</a> 发布于 {formatDatetime(topic.createTime)}
                                    </small>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="mt-3">
                    <Pagination
                        page={data.page}
                        total={data.total}
                        pageSize={data.pageSize}
                        onChangePage={page => this.handlePageChange(page)}
                    />
                </div>
            </div>
        )
    }
}

TopicList.propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    onViewDetail: PropTypes.func
}

TopicList.defaultProps = {
    data: null,
    loading: false,
    onViewDetail: () => null
}
