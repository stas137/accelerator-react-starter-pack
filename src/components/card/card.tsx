import {GuitarType} from '../../types/guitars';
import {convertPath, getFillArrayFrom1toN} from '../../utils/common';
import {Link, useHistory} from 'react-router-dom';
import {RATING_MAX} from '../../utils/const';

type CardPropsType = {
  guitar: GuitarType,
}

function Card({guitar}: CardPropsType):JSX.Element {

  const arrayForRating = getFillArrayFrom1toN(RATING_MAX);
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
        <Link className="button button--red button--mini button--add-to-cart" to="/#">Купить</Link>
      </div>
    </div>
  );
}

export default Card;
