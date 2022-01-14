import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import FilterElementString from './filter-element-string';

const history = createMemoryHistory();

describe('Component: FilterElementString', () => {

  it('should render correctly', () => {

    render(
      <Router history={history}>
        <FilterElementString
          item={'Акустические гитары'}
          checked={false}
          disabled={false}
          handleInputStringsChange={jest.fn}
        />
      </Router>,
    );

    expect(screen.getByText('Акустические гитары')).toBeInTheDocument();

  });

});
