import {render, screen} from '@testing-library/react';
import ModalSuccess from './modal-success';

describe('Component: ModalSuccess', () => {

  it('should render correctly', () => {

    render(
      <ModalSuccess
        setShowModalSuccess={jest.fn}
      />);

    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();

  });

});
