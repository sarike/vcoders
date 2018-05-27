import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import validate, { validateField } from '../../../common/validate'
import rules from '../../../common/validation/topic'
import './topic-form.scss'

export default class TopicForm extends PureComponent {
    static getDerivedStateFromProps (nextProps, prevState) {
        const { topic } = nextProps
        const { inputed } = prevState
        if (inputed || !topic) return null
        return {
            formData: {
                title: topic.title,
                content: topic.content,
                tags: topic.tags.map(t => t.id),
                newTags: []
            }
        }
    }
    constructor (props) {
        super(props)
        this.state = {
            errors: {},
            formData: {
                title: '',
                content: '',
                tags: [],
                newTags: []
            },
            inputed: false
        }
    }
    handleFieldChange (e) {
        const { name, value } = e.target
        let targetValue = value
        let validateFieldName = name
        if (name === 'newTags') {
            targetValue = value ? value.split(',') : []
            validateFieldName = 'tags'
        }
        this.setState(prevState => {
            const nextFormData = {
                ...prevState.formData,
                [name]: targetValue
            }
            const valRet = validateField(nextFormData[validateFieldName], rules[validateFieldName], nextFormData)
            return {
                formData: nextFormData,
                errors: {
                    ...prevState.errors,
                    [validateFieldName]: valRet.error
                },
                inputed: true
            }
        })
    }
    handleSave () {
        const { formData } = this.state
        const { isValid, errors } = validate(formData, rules)
        if (!isValid) {
            this.setState({ errors })
            return
        }
        this.props.onSave(formData)
    }
    formControlClassName (name) {
        const { errors } = this.state
        if (errors[name] === undefined) return 'form-control'
        const isValid = !errors[name]
        return classnames({
            'form-control': true,
            'is-valid': isValid,
            'is-invalid': !isValid
        })
    }
    formControlInvalidFeedback (name) {
        return this.state.errors[name]
    }
    isTagSelected (tag) {
        return this.state.formData.tags.indexOf(tag.id) !== -1
    }
    handleSelectTag (e, tag) {
        e.preventDefault()
        const { tags } = this.state.formData
        const index = tags.findIndex(tId => tId === tag.id)
        let nextValue = []
        if (index === -1) {
            nextValue = tags.concat(tag.id)
        } else {
            nextValue = [...tags]
            nextValue.splice(index, 1)
        }
        this.handleFieldChange({
            target: {
                name: 'tags',
                value: nextValue
            }
        })
    }
    render () {
        const { loading } = this.props
        const { title, content, newTags } = this.state.formData
        return (
            <div className="card topic-form">
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="topic-title">标题</label>
                        <input
                            required
                            type="text"
                            className={this.formControlClassName('title')}
                            id="topic-title"
                            placeholder="请输入标题"
                            name="title"
                            value={title}
                            onChange={e => this.handleFieldChange(e)}
                        />
                        <div className="invalid-feedback">{this.formControlInvalidFeedback('title')}</div>
                        <small className="form-text text-muted">请用尽量简单概括的一句话来作为你要发表的内容的标题</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-content">内容</label>
                        <textarea
                            required
                            className={this.formControlClassName('content')}
                            id="topic-content"
                            placeholder="请输入主题内容"
                            name="content"
                            value={content}
                            onChange={e => this.handleFieldChange(e)}
                        />
                        <div className="invalid-feedback">{this.formControlInvalidFeedback('content')}</div>
                        <small className="form-text text-muted">主题内容支持 Markdown 语法，作为一个靠谱的程序员，请让你发表的内容像你写的代码一样清晰。</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-tags">标签</label>
                        <div className="mb-3">
                            {
                                this.props.tagList.map(tag => (
                                    <a
                                        href="#"
                                        className={`badge badge-${this.isTagSelected(tag) ? 'success' : 'primary'} mr-1`}
                                        key={tag.id}
                                        onClick={e => this.handleSelectTag(e, tag)}
                                    >{tag.name}</a>
                                ))
                            }
                        </div>
                        <input
                            required
                            type="text"
                            className={this.formControlClassName('tags')}
                            id="topic-tags"
                            placeholder="请设置标签"
                            name="newTags"
                            value={newTags.join(',')}
                            onChange={e => this.handleFieldChange(e)}
                        />
                        <div className="invalid-feedback">{this.formControlInvalidFeedback('tags')}</div>
                        <small className="form-text text-muted">为便于更容易被别人看到，请为主题设置准确的标签，多个标签请以逗号分隔。</small>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        disabled={loading}
                        onClick={() => this.handleSave()}
                    >
                        { loading ? '正在提交...' : '提 交' }
                    </button>
                    <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => this.props.onCancel()}
                    >
                        取消
                    </button>
                </div>
            </div>
        )
    }
}

TopicForm.propTypes = {
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    loading: PropTypes.bool,
    tagList: PropTypes.array
}

TopicForm.defaultProps = {
    onSave: () => null,
    onCancel: () => null,
    loading: false,
    tagList: []
}
