import React, { Component } from 'react'
import classnames from 'classnames'
import validate from '../../../common/validate'
import rules from '../../../common/validation/comment'

class CommentForm extends Component {
    constructor (props) {
        super(props)
        this.state = {
            formData: { content: '' },
            validateResult: null
        }
    }
    handleFieldChange (e) {
        const content = e.target.value
        const ret = validate({ content }, rules)
        this.setState({
            formData: { content },
            validateResult: ret
        })
    }
    handleSave () {
        const { validateResult, formData } = this.state
        if (!validateResult.isValid) return
        const res = this.props.onSave(formData.content)
        if (res && res.then) {
            res.then(() => this.setState({ formData: { content: '' } }))
        }
    }
    render () {
        const { validateResult } = this.state
        const contentClassNames = classnames({
            'form-control': true,
            'is-valid': validateResult && validateResult.isValid,
            'is-invalid': validateResult && !validateResult.isValid
        })
        return (
            <div>
                <strong><label htmlFor="comment-content">发表新评论</label></strong>
                <div className="mb-3">
                    <textarea
                        id="comment-content"
                        placeholder="请输入你对这个主题的看法……"
                        value={this.state.formData.content}
                        onChange={e => this.handleFieldChange(e)}
                        className={contentClassNames}
                        cols="30"
                        rows="5"
                    />
                    <div className="invalid-feedback">{validateResult && (validateResult.errors || {}).content}</div>
                </div>
                <button
                    className="btn btn-primary"
                    type="button"
                    disabled={this.props.loading || !this.state.formData.content}
                    onClick={() => this.handleSave()}
                >{this.props.loading ? '正在提交...' : '提交评论'}</button>
            </div>
        )
    }
}

export default CommentForm
