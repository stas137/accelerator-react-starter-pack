import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {makeFakeSort} from '../../utils/mock';
import CatalogSortType from './catalog-sort-type';

const history = createMemoryHistory();

const mockSort = makeFakeSort();

describe('Component: CatalogSortType', () => {

  it('should render correctly', () => {

    render(
      <Router history={history}>
        <CatalogSortType
          sort={mockSort}
          handleChangeSort={jest.fn}
        />
      </Router>,
    );

    expect(screen.getByTestId('catalog-sort__type')).toBeInTheDocument();

  });

});
