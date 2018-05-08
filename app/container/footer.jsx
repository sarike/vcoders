import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Footer extends PureComponent {
    render () {
        return (
            <div className="footer p-4">
                <div className="container">
                    <div className="links">
                        <a href="#">源码</a>
                    </div>
                    <div>
                        <small>VCoders（我们程序员） - 一个正经的程序员扯淡社区。</small>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state)(Footer)
