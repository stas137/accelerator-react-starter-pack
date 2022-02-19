import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import CartItem from '../cart-item/cart-item';
import { State } from '../../types/state';
import { CartType, GuitarType } from '../../types/guitars';
import { sortedCartGuitars } from '../../utils/common';
import { ThunkAppDispatch } from '../../types/action';
import { fetchCouponAction } from '../../store/api-actions';
import { getCartGuitars, getDiscountForCoupon } from '../../store/cart-process/selectors';
import { setGuitarModal, setShowModalCardDel } from '../../store/action';

const mapStateToProps = (state: State) => ({
  cartGuitars: getCartGuitars(state),
  discountForCoupon: getDiscountForCoupon(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onLoadCoupon(coupon: string) {
    dispatch(fetchCouponAction(coupon));
  },
  onSetGuitarModal(guitar: GuitarType) {
    dispatch(setGuitarModal(guitar));
  },
  onSetShowModalCardDel(flag: boolean) {
    dispatch(setShowModalCardDel(flag));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Cart({ cartGuitars, discountForCoupon, onLoadCoupon, onSetGuitarModal, onSetShowModalCardDel }: PropsFromRedux): JSX.Element {

  const [coupon, setCoupon] = useState<string>('');
  const [couponAccepted, setCouponAccepted] = useState<boolean>(false);
  const [couponRefused, setCouponRefused] = useState<boolean>(false);
  const [discount, setDiscount] = useState<number>(0);

  const totalSum = cartGuitars.reduce((sum, item) => sum + item.count * item.price, 0);
  const totalDiscount = (totalSum * discount) / 100;

  const afterSortCartGuitars = sortedCartGuitars(cartGuitars);

  useEffect(() => {
    if (Number(discountForCoupon) && Number(discountForCoupon) > 0 && coupon.length > 0) {
      setCouponAccepted(true);
      setCouponRefused(false);
      setDiscount(Number(discountForCoupon));
    } else if (coupon.length > 0) {
      setCouponAccepted(false);
      setCouponRefused(true);
      setDiscount(0);
    } else {
      setCouponAccepted(false);
      setCouponRefused(false);
      setDiscount(0);
    }
  }, [discountForCoupon, coupon.length]);

  const handleClickDelCard = (guitarModalData: CartType) => {
    onSetGuitarModal(guitarModalData);
    onSetShowModalCardDel(true);
  };

  const handlerSubmitForm = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onLoadCoupon(coupon);
  };

  const handlerChangeCouponInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setCoupon([...evt.target.value.trim()].filter((char) => char !== ' ').join(''));
    setCouponAccepted(false);
    setCouponRefused(false);
  };

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="title title--bigger page-content__title">Корзина</h1>
        <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
          <li className="breadcrumbs__item">
            <Link className="link" to="/">Главная</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="link" to="/">Каталог</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="link" to="/#">Корзина</Link>
          </li>
        </ul>
        <div className="cart">

          {
            afterSortCartGuitars.map((cartGuitar) => (
              <CartItem key={cartGuitar.vendorCode} guitar={cartGuitar} handleClickDelCard={handleClickDelCard} />
            ))
          }

          <div className="cart__footer">
            <div className="cart__coupon coupon">
              <h2 className="title title--little coupon__title">Промокод на скидку</h2>
              <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
              <form className="coupon__form" id="coupon-form" method="post" action="" onSubmit={handlerSubmitForm} >
                <div className="form-input coupon__input">
                  <label className="visually-hidden">Промокод</label>
                  <input
                    type="text"
                    placeholder="Введите промокод"
                    id="coupon"
                    name="coupon"
                    value={coupon}
                    onChange={handlerChangeCouponInput}
                  />
                  {
                    couponAccepted
                      ? <p className="form-input__message form-input__message--success">Промокод принят</p>
                      : null
                  }
                  {
                    couponRefused
                      ? <p className="form-input__message form-input__message--error">неверный промокод</p>
                      : null
                  }
                </div>
                <button className="button button--big coupon__button">Применить</button>
              </form>
            </div>
            <div className="cart__total-info">
              <p className="cart__total-item">
                <span className="cart__total-value-name">Всего:</span>
                <span className="cart__total-value">{totalSum} ₽</span>
              </p>
              <p className="cart__total-item">
                <span className="cart__total-value-name">Скидка:</span>
                {
                  totalDiscount > 0
                    ? <span className="cart__total-value cart__total-value--bonus">- {totalDiscount} ₽</span>
                    : <span className="cart__total-value cart__total-value">0 ₽</span>
                }

              </p>
              <p className="cart__total-item">
                <span className="cart__total-value-name">К оплате:</span>
                <span className="cart__total-value cart__total-value--payment">{totalSum - totalDiscount} ₽</span>
              </p>
              <button className="button button--red button--big cart__order-button">Оформить заказ</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default connector(Cart);
