import { CartType } from '../../types/guitars';
import { convertPath, getNameTypeGuitar } from '../../utils/common';
import { KeyboardEvent, MouseEvent } from 'react';
import { ThunkAppDispatch } from '../../types/action';
import { cartDelGuitar } from '../../store/action';
import { connect, ConnectedProps } from 'react-redux';

type ModalCardDelProps = {
  guitar: CartType,
  setShowModalCardDel: (flag: boolean) => void,
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onCardDelGuitar(cartGuitar: CartType) {
    dispatch(cartDelGuitar(cartGuitar));
  },
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function ModalCardDel({ guitar, setShowModalCardDel, onCardDelGuitar }: ModalCardDelProps & PropsFromRedux): JSX.Element {

  const handlerClickModalOverlay = (evt: MouseEvent<HTMLElement>) => {
    setShowModalCardDel(false);
  };

  const handlerKeyDownButton = (evt: KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === 'Escape') {
      setShowModalCardDel(false);
    }
  };

  const handlerBlurButton = () => {
    const buttonModalCardDel = document.getElementById('button-card-del');
    if (buttonModalCardDel) {
      buttonModalCardDel.focus();
    }
  };

  const handlerClickDelButton = () => {
    onCardDelGuitar({...guitar, count: 1});
    setShowModalCardDel(false);
  };

  return (
    <div style={{position: 'relative', width: 550, height: 440, marginBottom: 50}}>
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handlerClickModalOverlay}></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
            <div className="modal__info">
              <img className="modal__img" src={convertPath(guitar.previewImg)} width="67" height="137" alt="Честер bass" />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">{guitar.name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar.vendorCode}</p>
                <p className="modal__product-params">{getNameTypeGuitar(guitar.type)}, {guitar.stringCount} струнная</p>
                <p className="modal__price-wrapper">
                  <span className="modal__price">Цена:</span>
                  <span className="modal__price">{guitar.price} ₽</span>
                </p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--small modal__button" onClick={handlerClickDelButton}>Удалить товар</button>
              <button
                className="button button--black-border button--small modal__button modal__button--right"
                id="button-card-del"
                autoFocus
                onKeyDown={handlerKeyDownButton}
                onClick={() => { setShowModalCardDel(false); }}
              >
                Продолжить покупки
              </button>
            </div>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onBlur={handlerBlurButton}
              onKeyDown={handlerKeyDownButton}
            >
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area" onClick={() => { setShowModalCardDel(false); }}></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connector(ModalCardDel);
