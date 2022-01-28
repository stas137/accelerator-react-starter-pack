import {render, screen} from '@testing-library/react';
import {makeFakeGuitar} from '../../utils/mock';
import {Reviews} from './reviews';

const mockGuitar = makeFakeGuitar();

describe('Component: Reviews', () => {

  it('should render correctly', () => {

    render(
      <Reviews
        guitar={mockGuitar}
      />);

    expect(screen.getByText('Отзывы')).toBeInTheDocument();

  });

});
