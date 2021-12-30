import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {createAPI} from './services/api';
import {applyMiddleware, createStore} from '@reduxjs/toolkit';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {rootReducer} from './store/root-reducer';
import {Provider} from 'react-redux';
import {ThunkAppDispatch} from './types/action';
import {fetchGuitarAction, fetchGuitarsAction} from './store/api-actions';
import {redirect} from './store/middleware/redirect';
import browserHistory from './browser-history';
import {Router} from 'react-router-dom';

const api = createAPI();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ));

(store.dispatch as ThunkAppDispatch)(fetchGuitarsAction());

const path = browserHistory.location.pathname.split('/');
if ((path.length === 3) && (path[1] === 'product')) {
  (store.dispatch as ThunkAppDispatch)(fetchGuitarAction(Number(path[2])));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={browserHistory}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
