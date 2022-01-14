import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Footer from './footer';


describe('Component: Footer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Footer />
      </Router>,
    );

    const textElement = screen.getByText(/Магазин гитар/);
    const columnHeaderElement = screen.getByText('О нас');

    expect(textElement).toBeInTheDocument();
    expect(columnHeaderElement).toBeInTheDocument();
  });
});
