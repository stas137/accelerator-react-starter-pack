import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Route, Router} from 'react-router-dom';
import {AppRoute, DEFAULT_QUERIES} from '../../utils/const';
import {Provider} from 'react-redux';
import {
  makeFakeGuitar,
  makeFakeGuitars, makeFakeTotal
} from '../../utils/mock';
import {State} from '../../types/state';
import {AnyAction} from 'redux';
import thunk from 'redux-thunk';
import {api} from '../../services/api';
import Product from './product';

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
});


describe('Component: Product', () => {

  beforeEach(() => {
    history.push(AppRoute.Product);
  });

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Product}>
            <Product />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();

  });

});
