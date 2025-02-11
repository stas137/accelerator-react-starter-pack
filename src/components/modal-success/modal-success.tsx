import { KeyboardEvent, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { MODAL_THANKS_HEIGHT, MODAL_THANKS_MARGIN_BOTTOM, MODAL_THANKS_WIDTH } from '../../utils/const';
import { ThunkAppDispatch } from '../../types/action';
import { setShowModalSuccess } from '../../store/action';
import { connect, ConnectedProps } from 'react-redux';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSetShowModalSuccess(flag: boolean) {
    dispatch(setShowModalSuccess(flag));
  },
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function ModalSuccess({ onSetShowModalSuccess }: PropsFromRedux): JSX.Element {

  const history = useHistory();

  const handlerClickModalOverlay = (evt: MouseEvent<HTMLElement>) => {
    onSetShowModalSuccess(false);
  };

  const handlerKeyDownButton = (evt: KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === 'Escape') {
      onSetShowModalSuccess(false);
    }
  };

  const handlerBlurButton = () => {
    const buttonModalToCart = document.getElementById('button-to-cart');
    if (buttonModalToCart) {
      buttonModalToCart.focus();
    }
  };

  return (
    <div style={{position: 'relative', width: MODAL_THANKS_WIDTH, height: MODAL_THANKS_HEIGHT, marginBottom: MODAL_THANKS_MARGIN_BOTTOM}}>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handlerClickModalOverlay}></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Товар успешно добавлен в корзину</p>
            <div className="modal__button-container modal__button-container--add">
              <button
                className="button button--small modal__button"
                autoFocus
                id="button-to-cart"
                onKeyDown={handlerKeyDownButton}
                onClick={async() => {
                  await onSetShowModalSuccess(false);
                  history.push('/cart');
                }}
              >
                Перейти в корзину
              </button>
              <button
                className="button button--black-border button--small modal__button modal__button--right"
                onBlur={handlerBlurButton}
                onKeyDown={handlerKeyDownButton}
                onClick={async () => {
                  await onSetShowModalSuccess(false);
                  history.push('/');
                }}
              >
                Продолжить покупки
              </button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area" onClick={() => { onSetShowModalSuccess(false); }}></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connector(ModalSuccess);
