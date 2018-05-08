import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import tagApi from '../api/tag'

import TopicList from '../component/topic-list'
import * as actionCreators from '../redux/action'

class TagDetail extends PureComponent {
    componentDidMount () {
        const tagId = this.tagId()
        const { tag } = this.props
        if (!tag || tagId !== tag.id) {
            tagApi.view({ params: { id: tagId } }, { tagId })
        }
        tagApi.topicList({ params: { id: tagId } }, { tagId })
    }
    componentDidUpdate (prevProps, prevState) {
        const tagId = this.tagId()
        if (prevProps.tag && prevProps.tag.id !== tagId && !this.props.tagLoading) {
            tagApi.view({ params: { id: tagId } }, { tagId })
            tagApi.topicList({ params: { id: tagId } }, { tagId })
        }
    }
    tagId () {
        return parseInt(this.props.match.params.id, 10)
    }
    handelViewDetail (topic) {
        this.props.viewTopicDetail(topic)
        this.props.history.push(`/topic/${topic.id}`)
    }
    handlePageChange (page) {
        const tagId = this.tagId()
        tagApi.topicList({ params: { page, id: tagId } }, { tagId })
    }
    renderTag () {
        const { tag, tagLoading } = this.props
        if (tagLoading) return '正在加载...'
        if (!tag) return '标签不存在或者已被删除。'
        return tag.name
    }
    render () {
        const { tagTopicList, tagTopicListLoading } = this.props
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <strong>标签：{this.renderTag()}</strong>
                            </div>
                        </div>
                        <TopicList
                            data={tagTopicList}
                            loading={tagTopicListLoading}
                            onViewDetail={(topic) => this.handelViewDetail(topic)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state, actionCreators)(TagDetail)
