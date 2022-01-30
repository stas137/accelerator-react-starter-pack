import {render, screen} from '@testing-library/react';
import {makeFakeGuitar} from '../../utils/mock';
import {TabContent} from './tab-content';

const mockGuitar = makeFakeGuitar();

describe('Component: TabContent', () => {

  it('should render correctly', () => {

    render(
      <TabContent
        guitar={mockGuitar}
        indexTab={0}
      />);

    expect(screen.getByText(mockGuitar.vendorCode)).toBeInTheDocument();

  });

});
