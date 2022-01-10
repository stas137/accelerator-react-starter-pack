import Header from '../header/header';
import Footer from '../footer/footer';
import {State} from '../../types/state';
import {NameSpace} from '../../store/root-reducer';
import {connect, ConnectedProps} from 'react-redux';
import {convertPath} from '../../utils/common';
import Review from '../review/review';

const mapStateToProps = (state: State) => ({
  guitar: state[NameSpace.Data].guitar,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Product({guitar}: PropsFromRedux):JSX.Element {

  const arr = Array.from({length: 5}, (_, index) => index + 1);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>

          {
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item" key={'main'}>
                <a className="link" href="/">Главная</a>
              </li>
              <li className="breadcrumbs__item" key={'catalog'}>
                <a className="link" href="/">Каталог</a>
              </li>
              <li className="breadcrumbs__item" key={'product'}>
                <a className="link">Товар</a>
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
                  arr.map((item) => item <= guitar.rating
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
              <div className="tabs">
                <a className="button button--medium tabs__button" href="#characteristics">Характеристики</a>
                <a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
                <div className="tabs__content" id="characteristics">
                  <table className="tabs__table">
                    <tbody>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Артикул:</td>
                        <td className="tabs__value">{guitar.vendorCode}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Тип:</td>
                        <td className="tabs__value">{guitar.type}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Количество струн:</td>
                        <td className="tabs__value">{guitar.stringCount}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="tabs__product-description hidden">
                    {guitar.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{guitar.price} ₽</p>
              <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
            </div>
          </div>
          <section className="reviews">
            <h3 className="reviews__title title title--bigger">Отзывы</h3>
            <a className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>

            {
              guitar.comments.map((comment) => <Review key={comment.id} comment={comment} />)
            }

            <button className="button button--medium reviews__more-button">Показать еще отзывы</button>
            <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export {Product};
export default connector(Product);
