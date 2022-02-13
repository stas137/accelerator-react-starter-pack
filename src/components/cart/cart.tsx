import { Link } from 'react-router-dom';
import CartItem from '../cart-item/cart-item';
import { State } from '../../types/state';
import { getCartGuitars } from '../../store/cart-process/selectors';
import { connect, ConnectedProps } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import ModalCardDel from '../modal-card-del/modal-card-del';
import { CartType } from '../../types/guitars';
import { sortedCartGuitars } from '../../utils/common';
import { HEIGHT555, LIGHT333, MEDIUM444 } from '../../utils/const';

const mapStateToProps = (state: State) => ({
  cartGuitars: getCartGuitars(state),
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Cart({ cartGuitars }: PropsFromRedux): JSX.Element {

  const [showModalCardDel, setShowModalCardDel] = useState<boolean>(false);

  const [coupon, setCoupon] = useState<string>('');
  const [couponAccepted, setCouponAccepted] = useState<boolean>(false);
  const [couponRefused, setCouponRefused] = useState<boolean>(false);
  const [discount, setDiscount] = useState<number>(0);

  const [guitarModalDel, setGuitarModalDel] = useState<CartType>({
    id: 0,
    name: '',
    vendorCode: '',
    type: '',
    description: '',
    previewImg: '',
    stringCount: 0,
    rating: 0,
    price: 0,
    comments: [],
    count: 0,
  });

  const totalSum = cartGuitars.reduce((sum, item) => sum + item.count * item.price, 0);
  const totalCount = cartGuitars.reduce((total, item) => total + item.count, 0);
  const totalDiscount = totalCount * discount;

  const afterSortCartGuitars = sortedCartGuitars(cartGuitars);

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = showModalCardDel ? 'hidden' : 'auto';
    }
  }, [showModalCardDel]);

  const handleClickDelCard = (guitarModalData: CartType, showModalCardDelData: boolean) => {
    setGuitarModalDel(guitarModalData);
    setShowModalCardDel(showModalCardDelData);
  };

  const handlerSubmitForm = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    switch (coupon) {
      case LIGHT333.coupon:
        setCouponAccepted(true);
        setCouponRefused(false);
        setDiscount(LIGHT333.discount);
        break;
      case MEDIUM444.coupon:
        setCouponAccepted(true);
        setCouponRefused(false);
        setDiscount(MEDIUM444.discount);
        break;
      case HEIGHT555.coupon:
        setCouponAccepted(true);
        setCouponRefused(false);
        setDiscount(HEIGHT555.discount);
        break;
      default:
        setCouponAccepted(false);
        setCouponRefused(true);
        setDiscount(0);
        break;
    }
  };

  const handlerChangeCoupon = (evt: ChangeEvent<HTMLInputElement>) => {
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
              <form className="coupon__form" id="coupon-form" method="post" action="" onSubmit={handlerSubmitForm}>
                <div className="form-input coupon__input">
                  <label className="visually-hidden">Промокод</label>
                  <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" value={coupon} onChange={handlerChangeCoupon} />
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
                  discount > 0
                    ? <span className="cart__total-value cart__total-value--bonus">- {totalDiscount} ₽</span>
                    : <span className="cart__total-value cart__total-value">0 ₽</span>
                }

              </p>
              <p className="cart__total-item">
                <span className="cart__total-value-name">К оплате:</span>
                <span className="cart__total-value cart__total-value--payment">{totalSum - discount} ₽</span>
              </p>
              <button className="button button--red button--big cart__order-button">Оформить заказ</button>
            </div>
          </div>

          {
            showModalCardDel
              ? <ModalCardDel guitar={guitarModalDel} setShowModalCardDel={setShowModalCardDel} />
              : null
          }
        </div>
      </div>
    </main>
  );
}

export default connector(Cart);
