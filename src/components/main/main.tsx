import CatalogCards from '../catalog-cards/catalog-cards';
import {
  addQueryParams,
  getNameSort,
  getNameTypeGuitar
} from '../../utils/common';

import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {NameSpace} from '../../store/root-reducer';
import Footer from '../footer/footer';
import Header from '../header/header';
import {ChangeEvent, useEffect, useState} from 'react';
import FilterElementString from '../filter-element-string/filter-element-string';
import Pagination from '../pagination/pagination';
import {GuitarsQuery} from '../../types/guitars-query';
import {fetchGuitarsAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../types/action';
import {LIST_OPTIONS, PRICE_MAX, PRICE_MIN, STRING_COUNTS_DATA, TYPES_GUITARS_DATA} from '../../utils/const';

const mapStateToProps = (state: State) => ({
  guitars: state[NameSpace.Data].guitars,
  total: state[NameSpace.Data].total,
  loading: state[NameSpace.Data].loading,
  error: state[NameSpace.Data].error,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onLoadGuitars(queryParams: GuitarsQuery) {
    dispatch(fetchGuitarsAction(queryParams));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const defaultQueries = {
  page: 1,
  perPage: 9,
  type: [],
  stringCount: [],
};

function Main({guitars, total, loading, error, onLoadGuitars}: PropsFromRedux):JSX.Element {

  const [params, setParams] = useState<GuitarsQuery>(defaultQueries);

  const [priceMaxFilter, setPriceMaxFilter] = useState<number>(PRICE_MAX);
  const [priceMinFilter, setPriceMinFilter] = useState<number>(PRICE_MIN);


  const handleAddQueryParams = (queries: Partial<GuitarsQuery> = {}) => {
    const queryParams: GuitarsQuery = {...defaultQueries, ...addQueryParams(queries)};

    if (typeof queryParams.type === 'string') {
      queryParams.type = [queryParams.type];
    }

    if (typeof queryParams.stringCount === 'string') {
      queryParams.stringCount = [queryParams.stringCount];
    }

    setParams(queryParams);
    onLoadGuitars(queryParams);

    // eslint-disable-next-line no-console
    console.log(queryParams);
  };


  useEffect(() => {
    handleAddQueryParams();
  }, []);


  const handleChangeMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPriceMinFilter(Number(e.target.value));
  };

  const handleChangeMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPriceMaxFilter(Number(e.target.value));
  };

  const handleBlurInputPriceMin = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < PRICE_MIN || Number(e.target.value) > PRICE_MAX) {
      e.target.value = PRICE_MIN.toString();
      setPriceMinFilter(PRICE_MIN);
    }

    handleAddQueryParams({ minPrice: Number(e.target.value)} );
  };

  const handleBlurInputPriceMax = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > PRICE_MAX || !e.target.value.length || Number(e.target.value) < 0 || Number(e.target.value) < priceMinFilter) {
      e.target.value = PRICE_MAX.toString();
      setPriceMaxFilter(PRICE_MAX);
    }

    handleAddQueryParams({ maxPrice: Number(e.target.value)} );
  };


  const handleChangeSort = (newSelectedSort: string) => {
    handleAddQueryParams({ _sort: newSelectedSort });
  };


  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <a className="link" href="./main.html">Главная</a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link">Каталог</a>
            </li>
          </ul>
          <div className="catalog">
            <form className="catalog-filter">
              <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Цена, ₽</legend>
                <div className="catalog-filter__price-range">
                  <div className="form-input">
                    <label className="visually-hidden">Минимальная цена</label>
                    <input
                      type="number"
                      value={priceMinFilter}
                      id="priceMin"
                      name="от"
                      onChange={handleChangeMinPrice}
                      onBlur={handleBlurInputPriceMin}
                    />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">Максимальная цена</label>
                    <input
                      type="number"
                      value={priceMaxFilter}
                      id="priceMax"
                      name="до"
                      onChange={handleChangeMaxPrice}
                      onBlur={handleBlurInputPriceMax}
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Тип гитар</legend>
                {
                  TYPES_GUITARS_DATA.map((item) => {
                    const checked = params.type.includes(item);
                    return (
                      <div className="form-checkbox catalog-filter__block-item" key={item}>
                        <input
                          className="visually-hidden"
                          type="checkbox"
                          id={item}
                          name={item}
                          checked={checked}
                          onChange={() => handleAddQueryParams({
                            type: checked ? params.type.filter((type) => type !== item) : [...params.type, item],
                          })}
                        />
                        <label htmlFor={item}>{getNameTypeGuitar(item)}</label>
                      </div>
                    );
                  })
                }
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Количество струн</legend>

                {
                  STRING_COUNTS_DATA.map((item) => {
                    const checked = params.stringCount.includes(item);
                    return (
                      <FilterElementString
                        key={item}
                        item={item}
                        checked={checked}
                        handleInputStringsChange={() => handleAddQueryParams({
                          stringCount: checked ? params.stringCount.filter((stringCount) => stringCount !== item) : [...params.stringCount, item],
                        })}
                      />
                    );
                  })
                }

              </fieldset>
            </form>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                {
                  LIST_OPTIONS.map((item) => item === params._sort
                    ? (
                      <button
                        className="catalog-sort__type-button catalog-sort__type-button--active"
                        aria-label={item}
                        tabIndex={-1}
                        key={item}
                      >
                        {getNameSort(item)}
                      </button>
                    )
                    : (
                      <button
                        className="catalog-sort__type-button"
                        aria-label={item}
                        key={item}
                        onClick={() => handleChangeSort(item)}
                      >
                        {getNameSort(item)}
                      </button>
                    ),
                  )
                }

              </div>
              <div className="catalog-sort__order">
                {

                  params._order === 'asc'
                    ? (
                      <>
                        <button className="catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active" aria-label="По возрастанию" tabIndex={-1} >
                        </button>
                        <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию" onClick={() => handleAddQueryParams({ _order: 'desc' })} >
                        </button>
                      </>
                    )
                    : (
                      <>
                        <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию" tabIndex={-1}  onClick={() => handleAddQueryParams({ _order: 'asc' })}>
                        </button>
                        <button className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active" aria-label="По убыванию" >
                        </button>
                      </>
                    )
                }
              </div>
            </div>

            <CatalogCards
              guitars={guitars}
              loading={loading}
              error={error}
            />

            <Pagination
              page={params.page}
              perPage={params.perPage}
              totalCount={total}
              onChange={(page: number) => handleAddQueryParams({page})}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export {Main};
export default connector(Main);
