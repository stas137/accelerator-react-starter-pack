import {render, screen} from '@testing-library/react';
import {ModalThanks} from './modal-thanks';

describe('Component: ModalThanks', () => {

  it('should render correctly', () => {

    render(
      <ModalThanks
        setShowModalThanks={jest.fn}
      />);

    expect(screen.getByText('Спасибо за ваш отзыв!')).toBeInTheDocument();

  });

});
