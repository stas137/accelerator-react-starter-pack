import {render, screen} from '@testing-library/react';
import {makeFakeGuitar} from '../../utils/mock';
import {Characteristics} from './characteristics';

const mockGuitar = makeFakeGuitar();

describe('Component: Characteristics', () => {

  it('should render correctly', () => {

    render(
      <Characteristics
        guitar={mockGuitar}
      />);

    expect(screen.getByText(mockGuitar.vendorCode)).toBeInTheDocument();

  });

});
