import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {DEFAULT_QUERIES} from '../../utils/const';
import {Provider} from 'react-redux';
import {
  makeFakeCartGuitar,
  makeFakeCartGuitars,
  makeFakeGuitar,
  makeFakeGuitars,
  makeFakeTotal
} from '../../utils/mock';
import {State} from '../../types/state';
import {AnyAction} from 'redux';
import thunk from 'redux-thunk';
import {api} from '../../services/api';
import CartItem from './cart-item';

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction>(middlewares);

const mockGuitar = makeFakeCartGuitar();

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

describe('Component: CartItem', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <CartItem
          guitar={mockGuitar}
          handleClickDelCard={jest.fn}
        />
      </Provider>,
    );

    expect(screen.getByText(/струнная/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();

  });

});
