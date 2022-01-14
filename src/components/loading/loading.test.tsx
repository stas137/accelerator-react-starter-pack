import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Loading from './loading';


describe('Component: Loading', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Loading />
      </Router>,
    );

    const element = screen.getByText('Loading');

    expect(element).toBeInTheDocument();
  });
});
