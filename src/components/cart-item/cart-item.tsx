import { CartType } from '../../types/guitars';
import { convertPath, getNameTypeGuitar } from '../../utils/common';
import { ThunkAppDispatch } from '../../types/action';
import { cartAddGuitar, cartSetCountGuitar, cartSubGuitar } from '../../store/action';
import { connect, ConnectedProps } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onCardAddGuitar(cartGuitar: CartType) {
    dispatch(cartAddGuitar(cartGuitar));
  },
  onCardSubGuitar(cartGuitar: CartType) {
    dispatch(cartSubGuitar(cartGuitar));
  },
  onCardSetCountGuitar(cartGuitar: CartType) {
    dispatch(cartSetCountGuitar(cartGuitar));
  },
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type CartItemProps = {
  guitar: CartType,
  handleClickDelCard: (guitar: CartType, flag: boolean) => void,
}

function CartItem({ guitar, handleClickDelCard, onCardAddGuitar, onCardSubGuitar, onCardSetCountGuitar }: CartItemProps & PropsFromRedux): JSX.Element {

  const [countValue, setCountValue] = useState<number>(guitar.count);

  useEffect(() => {
    setCountValue(guitar.count);
  }, [guitar.count]);

  const handlerClickButtonAdd = () => {
    if (guitar.count < 99) {
      onCardAddGuitar({ ...guitar, count: 1 });
    }
  };

  const handlerClickButtonSub = () => {
    if (guitar.count > 1) {
      onCardSubGuitar({ ...guitar, count: -1 });
    } else {
      handleClickDelCard(guitar,true);
    }
  };

  const handlerClickButtonDel = () => {
    handleClickDelCard(guitar,true);
  };

  const handlerChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    if (Number(evt.target.value) >= 0 && Number(evt.target.value) < 99) {
      setCountValue(Number(evt.target.value));
      onCardSetCountGuitar({ ...guitar, count: Number(evt.target.value) });
    }
  };

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить">
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area" onClick={handlerClickButtonDel}></span>
      </button>
      <div className="cart-item__image">
        <img src={convertPath(guitar.previewImg)} width="55" height="130" alt={guitar.name} />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{guitar.name}</p>
        <p className="product-info__info">Артикул: {guitar.vendorCode}</p>
        <p className="product-info__info">{getNameTypeGuitar(guitar.type)}, {guitar.stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{guitar.price} ₽</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество" onClick={handlerClickButtonSub}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input
          className="quantity__input"
          type="number"
          placeholder={countValue.toString()}
          id="4-count"
          name="4-count"
          min="0"
          max="99"
          value={countValue === 0 ? '' : countValue}
          onChange={handlerChangeInput}
        />
        <button className="quantity__button" aria-label="Увеличить количество" onClick={handlerClickButtonAdd}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{guitar.price * guitar.count} ₽</div>
    </div>
  );
}

export default connector(CartItem);
