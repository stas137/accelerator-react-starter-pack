import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import SelectList from './select-list';
import {makeFakeGuitars} from '../../utils/mock';

const history = createMemoryHistory();

const mockGuitars = makeFakeGuitars();

describe('Component: SelectList', () => {

  it('should render correctly', () => {

    const loading = false;
    const error = false;

    render(
      <Router history={history}>
        <SelectList
          guitars={mockGuitars}
          searchValue="curt"
          loading={loading}
          error={error}
          handleClickListItem={jest.fn}
        />
      </Router>,
    );

    expect(screen.getByTestId('select-list')).toBeInTheDocument();

  });

  it('should render correctly when loading is true', () => {

    const loading = true;
    const error = false;

    render(
      <Router history={history}>
        <SelectList
          guitars={mockGuitars}
          searchValue="curt"
          loading={loading}
          error={error}
          handleClickListItem={jest.fn}
        />
      </Router>,
    );

    expect(screen.getByTestId('select-list-loading')).toBeInTheDocument();

  });

  it('should render correctly when error is true', () => {

    const loading = false;
    const error = true;

    render(
      <Router history={history}>
        <SelectList
          guitars={mockGuitars}
          searchValue="curt"
          loading={loading}
          error={error}
          handleClickListItem={jest.fn}
        />
      </Router>,
    );

    expect(screen.getByTestId('select-list-error')).toBeInTheDocument();

  });

});
