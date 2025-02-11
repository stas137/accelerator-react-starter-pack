import {render, screen} from '@testing-library/react';
import { makeFakeCartGuitars, makeFakeGuitar, makeFakeGuitars, makeFakeTotal } from '../../utils/mock';
import Card from './card';
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

describe('Component: Card', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Card
          guitar={mockGuitar}
          handleClickAddCard={jest.fn()}
        />
      </Provider>,
    );

    expect(screen.getByText(mockGuitar.name)).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });

});
