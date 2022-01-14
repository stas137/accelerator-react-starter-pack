import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {makeFakeOrder} from '../../utils/mock';
import CatalogSortOrder from './catalog-sort-order';

const history = createMemoryHistory();

const mockOrder = makeFakeOrder();

describe('Component: CatalogSortOrder', () => {

  it('should render correctly', () => {

    render(
      <Router history={history}>
        <CatalogSortOrder
          order={mockOrder}
          handleAddQueryParams={jest.fn}
        />
      </Router>,
    );

    expect(screen.getByTestId('catalog-sort__order')).toBeInTheDocument();

  });

});
