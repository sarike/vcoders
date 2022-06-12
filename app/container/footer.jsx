import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Footer extends PureComponent {
  render() {
    return (
      <div className="footer p-4">
        <div className="container">
          <div className="links">
            <a href="https://github.com/sarike/vcoders" target="_blank" rel="noopener noreferrer">
              源码
            </a>
          </div>
          <div>
            <small>VCoders 一个正经的程序员扯淡社区。</small>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
              <small>
                京ICP备18032651号-2
              </small>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => state)(Footer);
