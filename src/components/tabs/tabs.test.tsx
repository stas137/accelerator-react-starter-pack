import {render, screen} from '@testing-library/react';
import {makeFakeGuitar} from '../../utils/mock';
import {Tabs} from './tabs';

const mockGuitar = makeFakeGuitar();

describe('Component: Tabs', () => {

  it('should render correctly', () => {

    render(
        <Tabs
          guitar={mockGuitar}
          indexTab={0}
          handlerChangeTab={jest.fn}
        />);

    expect(screen.getByText(mockGuitar.vendorCode)).toBeInTheDocument();

  });

});
