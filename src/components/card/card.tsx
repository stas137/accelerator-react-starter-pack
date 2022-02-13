import {GuitarType} from '../../types/guitars';
import {convertPath, getRange} from '../../utils/common';
import {RATING_MAX} from '../../utils/const';
import {useHistory} from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { getCartGuitars } from '../../store/cart-process/selectors';
import { State } from '../../types/state';

const mapStateToProps = (state: State) => ({
  cartGuitars: getCartGuitars(state),
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type CardPropsType = {
  guitar: GuitarType,
  handleClickAddCard: (guitar: GuitarType, showModalAddCard: boolean) => void;
}

function Card({ guitar, cartGuitars, handleClickAddCard }: CardPropsType & PropsFromRedux):JSX.Element {

  const arrayForRating = getRange(RATING_MAX);
  const history = useHistory();

  return (
    <div className="product-card">
      <img src={convertPath(guitar.previewImg)} width="75" height="190" alt={guitar.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          {
            arrayForRating.map((item) => item <= guitar.rating
              ? (
                <svg width="12" height="11" aria-hidden="true" key={item}>
                  <use xlinkHref="#icon-full-star"></use>
                </svg>)
              : (
                <svg width="12" height="11" aria-hidden="true" key={item}>
                  <use xlinkHref="#icon-star"></use>
                </svg>),
            )
          }

          <span className="rate__count">{guitar.comments.length}</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {guitar.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <span className="button button--mini" onClick={() => history.push(`/product/${guitar.id}`)}>Подробнее</span>
        {
          cartGuitars.find((item) => item.vendorCode === guitar.vendorCode)
            ? (
              <span className="button button--red-border button--mini button--in-cart" >В Корзине</span>
            )
            : (
              <span className="button button--red button--mini button--add-to-cart" onClick={ () => {handleClickAddCard(guitar, true);} }>
                Купить
              </span>
            )
        }
      </div>
    </div>
  );
}

export default connector(Card);
