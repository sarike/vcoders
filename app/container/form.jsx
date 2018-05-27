import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import topicApi from '../api/topic'
import tagApi from '../api/tag'

import TopicForm from '../component/topic-form'

class Form extends PureComponent {
    componentDidMount () {
        tagApi.list()
        if (this.isEditing()) {
            this.fetchTopic()
        }
    }
    componentDidUpdate (prevProps, prevState) {
        if (!this.isEditing()) return
        const topicId = parseInt(this.props.match.params.id, 10)
        const { topic, topicLoading } = this.props
        if (!topicLoading && (!topic || topicId !== topic.id)) {
            this.fetchTopic()
        }
    }
    handleSaveTopic (topic) {
        if (this.isEditing()) {
            topicApi
                .update({
                    params: { id: this.props.match.params.id },
                    data: topic
                })
                .then(() => this.toTopicDetail())
            return
        }
        topicApi
            .create({
                data: topic
            })
            .then(() => this.toHome())
    }
    handleCancel () {
        if (this.isEditing()) {
            this.toTopicDetail()
        } else {
            this.toHome()
        }
    }
    fetchTopic () {
        const topicId = parseInt(this.props.match.params.id, 10)
        topicApi.view({
            params: {
                id: topicId
            }
        }, { topicId })
    }
    isEditing () {
        return !!this.props.match.params.id
    }
    toHome () {
        this.props.history.push('/')
    }
    toTopicDetail () {
        const { id } = this.props.match.params
        if (!id) return
        this.props.history.push(`/topic/${id}`)
    }
    render () {
        const { topicSaveLoading, tagList, topic } = this.props
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <TopicForm
                            loading={topicSaveLoading}
                            tagList={tagList}
                            topic={topic}
                            isEditing={this.isEditing()}
                            onSave={topic => this.handleSaveTopic(topic)}
                            onCancel={() => this.handleCancel()}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state)(Form)
