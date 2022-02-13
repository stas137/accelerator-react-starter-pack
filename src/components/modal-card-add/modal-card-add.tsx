import { CartType, GuitarType } from '../../types/guitars';
import { convertPath, getNameTypeGuitar } from '../../utils/common';
import { KeyboardEvent, MouseEvent } from 'react';
import { ThunkAppDispatch } from '../../types/action';
import { cartAddGuitar } from '../../store/action';
import { connect, ConnectedProps } from 'react-redux';

type ModalCardAddPropsType = {
  guitar: GuitarType,
  setShowModalCardAdd: (flag: boolean) => void,
  setShowModalSuccess: (flag: boolean) => void,
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onCardAddGuitar(cartGuitar: CartType) {
    dispatch(cartAddGuitar(cartGuitar));
  },
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function ModalCardAdd({ guitar, setShowModalCardAdd, setShowModalSuccess, onCardAddGuitar }: ModalCardAddPropsType & PropsFromRedux): JSX.Element {

  const handlerClickModalOverlay = (evt: MouseEvent<HTMLElement>) => {
    setShowModalCardAdd(false);
  };

  const handlerKeyDownButton = (evt: KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === 'Escape') {
      setShowModalCardAdd(false);
    }
  };

  const handlerBlurButton = () => {
    const buttonModalCardAdd = document.getElementById('button-card-add');
    if (buttonModalCardAdd) {
      buttonModalCardAdd.focus();
    }
  };

  const handlerClickAddButton = () => {
    onCardAddGuitar({ ...guitar, count: 1});
    setShowModalCardAdd(false);
    setShowModalSuccess(true);
  };

  return (
    <div style={{position: 'relative', width: 550, height: 440, marginBottom: 50}}>
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handlerClickModalOverlay}></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
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
              <button
                id="button-card-add"
                className="button button--red button--big modal__button modal__button--add"
                autoFocus
                onBlur={handlerBlurButton}
                onKeyDown={handlerKeyDownButton}
                onClick={handlerClickAddButton}
              >
                Добавить в корзину
              </button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area" onClick={() => {setShowModalCardAdd(false);}}></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connector(ModalCardAdd);
