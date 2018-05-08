import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import topicApi from '../api/topic'

import UserProfileForm from '../component/user-profile-form'

class Detail extends PureComponent {
    handleSaveComment (content) {
        const topicId = this.topicId()
        return topicApi.addComment({
            params: { id: topicId },
            data: { content }
        }, { topicId })
    }
    render () {
        const { userProfile } = this.props
        return (
            <div className="container mt-4">
                <UserProfileForm user={userProfile} />
            </div>
        )
    }
}

export default connect(state => state)(Detail)
