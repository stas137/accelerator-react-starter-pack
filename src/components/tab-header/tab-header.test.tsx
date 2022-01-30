import {render, screen} from '@testing-library/react';
import {TabHeader} from './tab-header';

describe('Component: TabHeader', () => {

  it('should render correctly', () => {

    render(
      <TabHeader
        indexTab={0}
        currentIndexTab={0}
        titleTab="Характеристики"
        nameTab="characteristics"
        handlerChangeTab={jest.fn}
      />);

    expect(screen.getByText('Характеристики')).toBeInTheDocument();

  });

});
