import { render, screen } from '@testing-library/react';
import ModalSuccess from './modal-success';
import thunk from 'redux-thunk';
import { api } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { AnyAction } from 'redux';
import { makeFakeCartGuitars, makeFakeGuitar, makeFakeGuitars, makeFakeTotal } from '../../utils/mock';
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
  MODAL: {
    guitar: makeFakeGuitar(),
    showModalCardAdd: false,
    showModalCardDel: false,
    showModalSuccess: false,
  },
});

describe('Component: ModalSuccess', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <ModalSuccess />
      </Provider>);

    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();

  });

});
