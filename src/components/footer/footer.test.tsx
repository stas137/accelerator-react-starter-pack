import {render, screen} from '@testing-library/react';
import Footer from './footer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { api } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { AnyAction } from 'redux';
import { makeFakeCartGuitars, makeFakeGuitar, makeFakeGuitars, makeFakeTotal } from '../../utils/mock';
import { DEFAULT_QUERIES } from '../../utils/const';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

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

describe('Component: Footer', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <Footer />
        </Router>
      </Provider>);

    const textElement = screen.getByText(/Магазин гитар/);
    const columnHeaderElement = screen.getByText('О нас');

    expect(textElement).toBeInTheDocument();
    expect(columnHeaderElement).toBeInTheDocument();
  });
});
