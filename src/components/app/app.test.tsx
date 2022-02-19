import {render, screen} from '@testing-library/react';
import App from './app';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import React from 'react';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import {api} from '../../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {AnyAction} from 'redux';
import {makeFakeCartGuitars, makeFakeGuitar, makeFakeGuitars, makeFakeTotal} from '../../utils/mock';
import {AppRoute, DEFAULT_QUERIES} from '../../utils/const';

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction>(middlewares);

const history = createMemoryHistory();

const store = mockStore({
  DATA: {
    guitars: makeFakeGuitars(),
    total: makeFakeTotal(),
    loading: false,
    error: false,
    params: DEFAULT_QUERIES,
  },
  BOOK: {
    guitar: makeFakeGuitar(),
  },
  SEARCH: {
    guitars: makeFakeGuitars(),
    total: makeFakeTotal(),
    loading: false,
    error: false,
    params: DEFAULT_QUERIES,
  },
  CART: {
    guitars: makeFakeCartGuitars(),
  },
  MODAL: {
    guitar: makeFakeGuitar(),
    showModalCardAdd: false,
    showModalCardDel: false,
    showModalSuccess: false,
  },
});

describe('Component: App', () => {

  test('should render correct', () => {

    history.push(AppRoute.Main);

    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    const textElement = screen.getByText(/Каталог гитар/i);
    expect(textElement).toBeInTheDocument();
  });

});


