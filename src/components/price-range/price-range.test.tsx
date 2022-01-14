import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import PriceRange from './price-range';

const history = createMemoryHistory();

describe('Component: PriceRange', () => {

  it('should render correctly', () => {

    render(
      <Router history={history}>
        <PriceRange
          minPrice={1700}
          maxPrice={35000}
          onChange={jest.fn}
        />
      </Router>,
    );

    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();

  });

});
