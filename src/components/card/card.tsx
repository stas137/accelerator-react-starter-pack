import {GuitarType} from '../../types/guitars';
import {convertPath} from '../../utils/common';
import {Link} from 'react-router-dom';

type CardPropsType = {
  guitar: GuitarType,
}

function Card({guitar}: CardPropsType):JSX.Element {

  const arr = Array.from({length: 5}, (_, index) => index + 1);

  return (
    <div className="product-card">
      <img src={convertPath(guitar.previewImg)} width="75" height="190" alt={guitar.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          {
            arr.map((item) => item <= guitar.rating
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
        <Link className="button button--mini" to="/#">Подробнее</Link>
        <Link className="button button--red button--mini button--add-to-cart" to="/#">Купить</Link>
      </div>
    </div>
  );
}

export default Card;
