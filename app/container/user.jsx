import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import TopicList from '../component/topic-list'
import UserProfile from '../component/user-profile'
import userApi from '../api/user'
import * as actionCreators from '../redux/action'

class User extends PureComponent {
    componentDidMount () {
        userApi.topicList({
            params: {
                id: this.props.match.params.id
            }
        })
    }
    handelViewDetail (topic) {
        this.props.viewTopicDetail(topic)
        this.props.history.push(`/topic/${topic.id}`)
    }
    render () {
        const { userTopicList, userTopicListLoading, userProfile } = this.props
        return (
            <div className="container mt-4">
                <UserProfile user={userProfile} />
                <TopicList
                    data={userTopicList}
                    loading={userTopicListLoading}
                    onViewDetail={topic => this.handelViewDetail(topic)}
                />
            </div>
        )
    }
}

export default connect(state => state, actionCreators)(User)
