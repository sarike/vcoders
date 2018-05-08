import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import topicApi from '../api/topic'
import tagApi from '../api/tag'

import TopicForm from '../component/topic-form'

class Publish extends PureComponent {
    componentDidMount () {
        tagApi.list()
    }
    handleSaveTopic (topic) {
        topicApi
            .create({
                data: topic
            })
            .then(() => this.toHome())
    }
    handleCancel () {
        this.toHome()
    }
    toHome () {
        this.props.history.push('/')
    }
    render () {
        const { topicPublishLoading, tagList } = this.props
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <TopicForm
                            loading={topicPublishLoading}
                            tagList={tagList}
                            onSave={topic => this.handleSaveTopic(topic)}
                            onCancel={() => this.handleCancel()}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state)(Publish)
