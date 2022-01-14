import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {makeFakeGuitar} from '../../utils/mock';
import Card from './card';

const history = createMemoryHistory();

const mockGuitar = makeFakeGuitar();

describe('Component: Card', () => {

  it('should render correctly', () => {

    render(
      <Router history={history}>
        <Card
          guitar={mockGuitar}
        />
      </Router>,
    );

    expect(screen.getByText(mockGuitar.name)).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });

});
