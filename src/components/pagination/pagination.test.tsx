import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Pagination from './pagination';

const history = createMemoryHistory();

describe('Component: Pagination', () => {

  it('should render correctly', () => {

    render(
      <Router history={history}>
        <Pagination
          page={'1'}
          perPage={9}
          totalCount={3}
          onChange={jest.fn}
        />
      </Router>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();

  });

});
