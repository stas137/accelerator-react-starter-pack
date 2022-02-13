import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import { makeFakeCartGuitars, makeFakeGuitar, makeFakeGuitars, makeFakeTotal } from '../../utils/mock';
import CatalogCards from './catalog-cards';
import thunk from 'redux-thunk';
import { api } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { AnyAction } from 'redux';
import { DEFAULT_QUERIES } from '../../utils/const';
import { Provider } from 'react-redux';

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction>(middlewares);

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

const history = createMemoryHistory();

const mockGuitars = makeFakeGuitars();

describe('Component: CatalogCards', () => {

  it('should render correctly', () => {

    const loading = false;
    const error = false;

    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogCards
            guitars={mockGuitars}
            loading={loading}
            error={error}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(mockGuitars[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockGuitars[1].name)).toBeInTheDocument();
  });

  it('should render correctly when loading is true', () => {

    const loading = true;
    const error = false;

    render(
      <Router history={history}>
        <CatalogCards
          guitars={mockGuitars}
          loading={loading}
          error={error}
        />
      </Router>,
    );

    expect(screen.getByText('Loading')).toBeInTheDocument();

  });

  it('should render correctly when error is true', () => {

    const loading = false;
    const error = true;

    render(
      <Router history={history}>
        <CatalogCards
          guitars={mockGuitars}
          loading={loading}
          error={error}
        />
      </Router>,
    );

    expect(screen.getByText('Error loading. Try later')).toBeInTheDocument();

  });

});
