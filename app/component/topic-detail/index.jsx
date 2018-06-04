import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Tags from '../tags'
import { formatDatetime, parseMarkdown } from '../../util'
import './topic-detail.scss'

export default class TopicDetail extends PureComponent {
    handleStick (e, topic) {
        e.preventDefault()
        this.props.onStick(topic)
    }
    handleEdit (e, topic) {
        e.preventDefault()
        this.props.onEdit(topic)
    }
    renderTopic () {
        const { loading, topic, stickable, editable } = this.props
        if (loading) return '正在加载主题详情...'
        if (!loading && !topic) return '未获取到主题详情，可能已经被删除或者压根不存在。'
        const { title, content, tags, user, createTime } = topic
        return (
            <Fragment>
                <h5 className="card-title">{title}</h5>
                <div className="mb-3">
                    <small><a href="#">{user && user.nickName}</a> 发表于 {formatDatetime(createTime)}</small>
                    <small>
                        { stickable && <a href="#" className="ml-3" onClick={e => this.handleStick(e, topic)}>{topic.isSticked ? '取消置顶' : '置顶'}</a>}
                        { editable && <a href="#" className="ml-3" onClick={e => this.handleEdit(e, topic)}>编辑</a>}
                    </small>
                </div>
                <div dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} />
                <div className="mb-1"><Tags tags={tags} /></div>
            </Fragment>
        )
    }
    render () {
        return (
            <div className="card mb-3 topic-detail">
                <div className="card-body">
                    {this.renderTopic()}
                </div>
            </div>
        )
    }
}

TopicDetail.propTypes = {
    topic: PropTypes.object,
    loading: PropTypes.bool,
    stickable: PropTypes.bool,
    editable: PropTypes.bool,
    onStick: PropTypes.func,
    onEdit: PropTypes.func
}

TopicDetail.defaultProps = {
    topic: {},
    loading: false,
    stickable: false,
    editable: false,
    onStick: () => null,
    onEdit: () => null
}
