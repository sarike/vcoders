import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from '../component/avatar';

class Header extends PureComponent {
  render() {
    const { userProfile } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            VCoders <span className="badge badge-success">Beta</span>
          </Link>
          <div className="navbar-nav flex-row ml-auto d-flex align-items-center">
            {userProfile ? (
              <React.Fragment>
                <Link className="nav-item nav-link avatar-link mr-3" to={`/user/${userProfile.id}`}>
                  <Avatar
                    src={userProfile.avatarURL}
                    className="rounded-circle"
                    alt={userProfile.nickName}
                    size={32}
                  />
                </Link>
                <Link to="/publish" className="btn btn-success">
                  发布新主题
                </Link>
              </React.Fragment>
            ) : (
              <a className="nav-item nav-link" href="/auth/github">
                登录
              </a>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default connect((state) => state)(Header);
