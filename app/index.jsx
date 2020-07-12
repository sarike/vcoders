import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const rootEl = document.querySelector('#root');

ReactDOM.render(<App />, rootEl);

if (module.hot) {
  module.hot.accept('./app', function () {
    var NextApp = require('./app').default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
