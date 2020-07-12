import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './user-profile-form.less';

class UserProfile extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      formData: {
        ...(nextProps.user || {}),
        ...prevState.formData,
      },
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
    };
  }
  handleFieldChange(e) {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  }
  render() {
    const { formData } = this.state;
    return (
      <div className="card user-profile-form">
        <div className="card-body">
          <div>
            <div className="form-group">
              <label htmlFor="nickName">昵称</label>
              <input
                type="text"
                className="form-control"
                name="nickName"
                value={formData.nickName || ''}
                onChange={(e) => this.handleFieldChange(e)}
              />
              <small className="form-text text-muted">请设置一个昵称，让大家都这么喊你</small>
            </div>
            <div className="form-group">
              <label htmlFor="slogan">个性签名</label>
              <textarea
                type="text"
                className="form-control"
                name="slogan"
                value={formData.slogan || ''}
                onChange={(e) => this.handleFieldChange(e)}
                rows="3"
              />
              <small className="form-text text-muted">请设置一个昵称，让大家都这么喊你</small>
            </div>
            <button className="btn btn-primary">保存</button>
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.object,
};

UserProfile.defaultProps = {
  user: {},
};

export default UserProfile;
