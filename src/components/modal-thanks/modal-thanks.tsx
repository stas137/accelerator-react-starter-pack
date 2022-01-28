import {MouseEvent, KeyboardEvent} from 'react';

type ModalThanksProps = {
  setShowModalThanks: (flag: boolean) => void,
}

function ModalThanks({setShowModalThanks}: ModalThanksProps): JSX.Element {

  const handlerClickModalOverlay = (evt: MouseEvent<HTMLElement>) => {
    setShowModalThanks(false);
  };

  const handlerBlurButton = () => {
    const buttonReview = document.getElementById('button-review');
    if (buttonReview) {
      buttonReview.focus();
    }
  };

  const handlerKeyDownButton = (evt: KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === 'Escape') {
      setShowModalThanks(false);
    }
  };

  return (
    <div style={{position: 'relative', width: 550, height: 410, marginBottom: 50}}>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handlerClickModalOverlay}></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button className="button button--small modal__button modal__button--review"
                id="button-review"
                autoFocus
                onBlur={handlerBlurButton}
                onClick={() => setShowModalThanks(false)}
                onKeyDown={handlerKeyDownButton}
              >
                К покупкам!
              </button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area" onClick={() => setShowModalThanks(false)}></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export {ModalThanks};
