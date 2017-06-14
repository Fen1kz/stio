import React from 'react';
import ReactDOM from 'react-dom';

// import { combineReducers } from 'redux-immutable';
// import configureStore from './configuration/configureStore'

// Socket
// import {makeSocketClient, socketStore, socketMiddleware} from './configuration/socket';

// Routing
// import {routerReducer, appRouterMiddleware, syncHistoryWithStore} from './configuration/routing';

// History
// import { browserHistory } from 'react-router';

// Components
// import { Root } from './components/Root.jsx';
// import { DevTools } from './components/DevTools.jsx'
// import * as reducers from './reducers'

// Styles
// import './styles/reset.scss';
// import 'react-mdl/extra/css/material.teal-indigo.min.css'
// import 'react-mdl/extra/material.min.js'
// import './styles/style.scss';

const render = () => {
  const App = require('./App.jsx').default;
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  );
};

render();

if (module.hot) {
  module.hot.accept('./App.jsx', render);
}