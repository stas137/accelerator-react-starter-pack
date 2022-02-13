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
import Main from './main';
import {State} from '../../types/state';
import {AnyAction} from 'redux';
import thunk from 'redux-thunk';
import {api} from '../../services/api';

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


describe('Component: Main', () => {

  beforeEach(() => {
    history.push(AppRoute.Main);
  });

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Main}>
            <Main />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();

  });

});
