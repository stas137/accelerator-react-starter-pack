import {render, screen} from '@testing-library/react';
import {
  makeFakeCartGuitar,
  makeFakeCartGuitars,
  makeFakeGuitar,
  makeFakeGuitars,
  makeFakeTotal
} from '../../utils/mock';
import thunk from 'redux-thunk';
import { api } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { AnyAction } from 'redux';
import { DEFAULT_QUERIES } from '../../utils/const';
import { Provider } from 'react-redux';
import ModalCardDel from './modal-card-del';

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

const mockGuitar = makeFakeCartGuitar();

describe('Component: ModalCardDel', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <ModalCardDel
          guitar={mockGuitar}
          setShowModalCardDel={jest.fn}
        />
      </Provider>);

    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();

  });

});
