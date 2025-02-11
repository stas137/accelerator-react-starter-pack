import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {convertPath, getRange} from '../../utils/common';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {ThunkAppDispatch} from '../../types/action';
import {fetchGuitarAction} from '../../store/api-actions';
import {getGuitar} from '../../store/book-process/selectors';
import {Link} from 'react-router-dom';
import {RATING_MAX} from '../../utils/const';
import {Tabs} from '../tabs/tabs';
import {Reviews} from '../reviews/reviews';
import { setGuitarModal, setShowModalCardAdd } from '../../store/action';
import { GuitarType } from '../../types/guitars';

const mapStateToProps = (state: State) => ({
  guitar: getGuitar(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onLoadGuitar(id: number) {
    dispatch(fetchGuitarAction(id));
  },
  onSetGuitarModal(guitar: GuitarType) {
    dispatch(setGuitarModal(guitar));
  },
  onSetShowModalCardAdd(flag: boolean) {
    dispatch(setShowModalCardAdd(flag));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Product({guitar, onLoadGuitar, onSetGuitarModal, onSetShowModalCardAdd}: PropsFromRedux):JSX.Element {

  const { id } = useParams<{ id?: string }>();

  const arrayForRating = getRange(RATING_MAX);

  const [indexTab, setIndexTab] = useState<number>(0);

  useEffect(() => {
    onLoadGuitar(Number(id));
  }, [id, onLoadGuitar]);

  const handlerChangeTab = (tab: string) => {
    switch (tab) {
      case 'characteristics':
        setIndexTab(0);
        break;
      case 'description':
        setIndexTab(1);
        break;
      default:
        setIndexTab(0);
        break;
    }
  };

  const handleClickAddCard = () => {
    onSetGuitarModal(guitar);
    onSetShowModalCardAdd(true);
  };

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">{guitar.name}</h1>

        {
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item" key={'main'}>
              <Link className="link" to="/">Главная</Link>
            </li>
            <li className="breadcrumbs__item" key={'guitars'}>
              <Link className="link" to="/">Каталог</Link>
            </li>
            <li className="breadcrumbs__item" key={'product'}>
              <Link className="link" to="#">{guitar.name}</Link>
            </li>
          </ul>
        }

        <div className="product-container">
          <img className="product-container__img" src={convertPath(guitar.previewImg)} width="90" height="235" alt="" />
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">{guitar.name}</h2>
            <div className="rate product-container__rating" aria-hidden="true">
              <span className="visually-hidden">Рейтинг:</span>
              {
                arrayForRating.map((item) => item <= guitar.rating
                  ? (
                    <svg width="14" height="14" aria-hidden="true" key={item}>
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                  )
                  : (
                    <svg width="14" height="14" aria-hidden="true" key={item}>
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  ))
              }

              <span className="rate__count">{guitar.comments.length}</span>
              <span className="rate__message"></span>
            </div>

            <Tabs
              guitar={guitar}
              currentIndexTab={indexTab}
              handlerChangeTab={handlerChangeTab}
            />

          </div>
          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">Цена:</p>
            <p className="product-container__price-info product-container__price-info--value">{guitar.price} ₽</p>
            <span className="button button--red button--big product-container__button" onClick={ () => {handleClickAddCard();} }>Добавить в корзину</span>
          </div>
        </div>

        <Reviews
          guitar={guitar}
        />

      </div>
    </main>
  );
}

export {Product};
export default connector(Product);
