import {render, screen} from '@testing-library/react';
import ModalReview from './modal-review';
import {makeFakeGuitar, makeFakeGuitars, makeFakeTotal} from '../../utils/mock';
import {DEFAULT_QUERIES} from '../../utils/const';
import thunk from 'redux-thunk';
import {api} from '../../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {AnyAction} from 'redux';
import {Provider} from 'react-redux';

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
});

const mockGuitar = makeFakeGuitar();

describe('Component: ModalReview', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <ModalReview
          guitar={mockGuitar}
          setShowModalReview={jest.fn}
          setShowModalThanks={jest.fn}
        />
      </Provider>,
    );

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByText('Отправить отзыв')).toBeInTheDocument();
  });

});
