import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Route, Router} from 'react-router-dom';
import {AppRoute, DEFAULT_QUERIES} from '../../utils/const';
import {Provider} from 'react-redux';
import {
  makeFakeCartGuitars,
  makeFakeGuitar,
  makeFakeGuitars,
  makeFakeTotal
} from '../../utils/mock';
import {State} from '../../types/state';
import {AnyAction} from 'redux';
import thunk from 'redux-thunk';
import {api} from '../../services/api';
import Cart from './cart';

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
});


describe('Component: Cart', () => {

  beforeEach(() => {
    history.push(AppRoute.Cart);
  });

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Cart}>
            <Cart />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();

  });

});
