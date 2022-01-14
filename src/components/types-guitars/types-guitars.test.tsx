import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import TypesGuitars from './types-guitars';

const history = createMemoryHistory();

describe('Component: TypesGuitars', () => {

  it('should render correctly', () => {

    render(
      <Router history={history}>
        <TypesGuitars
          typesGuitars={['acoustic']}
          stringCount={[]}
          handleAddQueryParams={jest.fn}
        />
      </Router>,
    );

    expect(screen.getByText('Тип гитар')).toBeInTheDocument();

  });

});
