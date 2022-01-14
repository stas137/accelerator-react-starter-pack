import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import StringCounts from './string-counts';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();

describe('Component: StringCounts', () => {

  it('should render correctly', () => {

    render(
      <Router history={history}>
        <StringCounts
          typesGuitars={[]}
          stringCount={['4', '6']}
          handleAddQueryParams={jest.fn}
        />
      </Router>,
    );

    expect(screen.getByText('Количество струн')).toBeInTheDocument();

  });

});
