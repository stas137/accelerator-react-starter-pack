import {render, screen} from '@testing-library/react';
import ModalCardAdd from './modal-card-add';
import { makeFakeCartGuitars, makeFakeGuitar, makeFakeGuitars, makeFakeTotal } from '../../utils/mock';
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

const mockGuitar = makeFakeGuitar();

describe('Component: ModalCardAdd', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <ModalCardAdd
          guitar={mockGuitar}
        />
      </Provider>);

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();

  });

});
