import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import PriceRange from './price-range';
import {PRICE_MAX, PRICE_MIN} from '../../utils/const';

const history = createMemoryHistory();

describe('Component: PriceRange', () => {

  it('should render correctly', () => {

    render(
      <Router history={history}>
        <PriceRange
          minPrice={PRICE_MIN}
          maxPrice={PRICE_MAX}
          onChange={jest.fn}
        />
      </Router>,
    );

    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();

  });

});
