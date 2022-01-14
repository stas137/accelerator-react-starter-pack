import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {makeFakeGuitars} from '../../utils/mock';
import CatalogCards from './catalog-cards';

const history = createMemoryHistory();

const mockGuitars = makeFakeGuitars();

describe('Component: CatalogCards', () => {

  it('should render correctly', () => {

    const loading = false;
    const error = false;

    render(
      <Router history={history}>
        <CatalogCards
          guitars={mockGuitars}
          loading={loading}
          error={error}
        />
      </Router>,
    );

    expect(screen.getByText(mockGuitars[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockGuitars[1].name)).toBeInTheDocument();
  });

  it('should render correctly when loading is true', () => {

    const loading = true;
    const error = false;

    render(
      <Router history={history}>
        <CatalogCards
          guitars={mockGuitars}
          loading={loading}
          error={error}
        />
      </Router>,
    );

    expect(screen.getByText('Loading')).toBeInTheDocument();

  });

  it('should render correctly when error is true', () => {

    const loading = false;
    const error = true;

    render(
      <Router history={history}>
        <CatalogCards
          guitars={mockGuitars}
          loading={loading}
          error={error}
        />
      </Router>,
    );

    expect(screen.getByText('Error loading. Try later')).toBeInTheDocument();

  });

});
