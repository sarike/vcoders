import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './pagination.less';

class Pagination extends PureComponent {
  handleChangePage(e, delta) {
    e.preventDefault();
    const { page } = this.props;
    const pageCount = this.pageCount();
    const targetPage = page + delta;
    if (page === 0 || page > pageCount) return;
    this.props.onChangePage(targetPage);
  }
  pageCount() {
    const { pageSize, total } = this.props;
    const pageCount = parseInt(total / pageSize);
    return total % pageSize === 0 ? pageCount : pageCount + 1;
  }
  render() {
    const { page } = this.props;
    const pageCount = this.pageCount();
    return (
      <nav className="pager" aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
            <a
              className="page-link"
              href="#"
              onClick={(e) => this.handleChangePage(e, -1)}
              tabIndex="-1"
            >
              上一页
            </a>
          </li>
          <li className="page-item">
            <div className="page-link">
              第 {page} 页，共 {pageCount} 页
            </div>
          </li>
          <li className={`page-item ${page >= pageCount ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={(e) => this.handleChangePage(e, 1)}>
              下一页
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  onChangePage: PropTypes.func,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  page: PropTypes.number,
};

Pagination.defaultProps = {
  onChangePage: () => null,
  total: 0,
  pageSize: 30,
  page: 1,
};

export default Pagination;
