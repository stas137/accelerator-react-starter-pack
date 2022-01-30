import {render, screen} from '@testing-library/react';
import {makeFakeGuitar} from '../../utils/mock';
import {Description} from './description';

const mockGuitar = makeFakeGuitar();

describe('Component: Description', () => {

  it('should render correctly', () => {

    render(
      <Description
        guitar={mockGuitar}
      />);

    expect(screen.getByText(mockGuitar.description)).toBeInTheDocument();

  });

});
