import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {api} from './services/api';
import {applyMiddleware, createStore} from '@reduxjs/toolkit';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {rootReducer} from './store/root-reducer';
import {Provider} from 'react-redux';
import {redirect} from './store/middleware/redirect';
import browserHistory from './browser-history';
import {Router} from 'react-router-dom';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={browserHistory}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
