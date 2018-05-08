import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import topicApi from '../api/topic'
import tagApi from '../api/tag'

import TopicList from '../component/topic-list'
import Tags from '../component/tags'
import * as actionCreators from '../redux/action'

class Home extends PureComponent {
    componentDidMount () {
        topicApi.list()
        tagApi.list()
    }
    handelViewDetail (topic) {
        this.props.viewTopicDetail(topic)
        this.props.history.push(`/topic/${topic.id}`)
    }
    handleViewTagDetail (tag) {
        this.props.viewTagDetail(tag)
        this.props.history.push(`/tag/${tag.id}`)
    }
    handlePageChange (page) {
        topicApi.list({ params: { page } })
    }
    render () {
        const { tagList, topicList, tagListLoading, topicListLoading } = this.props
        return (
            <div className="container mt-4">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="card-title">热门标签</div>
                        <Tags
                            loading={tagListLoading}
                            tags={tagList}
                            onTagClick={tag => this.handleViewTagDetail(tag)}
                        />
                    </div>
                </div>
                <TopicList
                    data={topicList}
                    loading={topicListLoading}
                    onViewDetail={(topic) => this.handelViewDetail(topic)}
                />
            </div>
        )
    }
}

export default connect(state => state, actionCreators)(Home)
