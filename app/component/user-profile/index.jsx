import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './user-profile.less';

class UserProfile extends PureComponent {
  render() {
    const { user } = this.props;
    if (!user) return null;
    return (
      <div className="user-profile mb-3">
        <img src={user.avatarURL} alt="avatar" className="rounded-circle avatar" />
        <div className="nickname">{user.nickName}</div>
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
