import CatalogCards from '../catalog-cards/catalog-cards';
import {
  filterGuitarsPrice,
  filterGuitarsStringCounts,
  filterGuitarsType,
  getCheckedStringCounts,
  getCheckedTypesGuitars, getDisabledStringCounts, getDisabledTypesGuitars,
  getNameSort,
  getNameTypeGuitar,
  getPriceMaxGuitars,
  getPriceMinGuitars,
  getQueryString,
  getStringCounts,
  getStringCountsForTypes,
  getTypeGuitarsForString,
  getTypesGuitars,
  sortGuitars
} from '../../utils/common';
import {Dispatch} from '@reduxjs/toolkit';
import {connect, ConnectedProps} from 'react-redux';
import {changeCurrentPage, changeSort, changeSortDirection} from '../../store/action';
import {State} from '../../types/state';
import {NameSpace} from '../../store/root-reducer';
import Footer from '../footer/footer';
import Header from '../header/header';
import {ChangeEvent, useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import FilterElementString from '../filter-element-string/filter-element-string';
import Pagination from '../pagination/pagination';

const mapStateToProps = (state: State) => ({
  guitars: state[NameSpace.Data].guitars,
  selectedSort: state[NameSpace.Book].selectedSort,
  sortDirection: state[NameSpace.Book].sortDirection,
  listOptions: state[NameSpace.Book].listOptions,
  currentPage: state[NameSpace.Book].currentPage,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChangeSort(selectedSort: string) {
    dispatch(changeSort(selectedSort));
  },
  onChangeSortDirection(sortDirection: string) {
    dispatch(changeSortDirection(sortDirection));
  },
  onChangeCurrentPage(currentPage: number) {
    dispatch(changeCurrentPage(currentPage));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Main({guitars, listOptions, currentPage, onChangeCurrentPage}: PropsFromRedux):JSX.Element {

  const history = useHistory();
  const location = useLocation();

  const historyPush = (queryString: string): void => {
    history.push({
      pathname: '/',
      search: queryString,
    });
  };

  const [portionSize] = useState<number>(2);
  const [guitarsPerPage] = useState<number>(6);

  const lastGuitarIndex = currentPage * guitarsPerPage;
  const firstGuitarIndex = lastGuitarIndex - guitarsPerPage;

  const [stringCounts, setStringCounts] = useState<number []>([]);
  const [typesGuitars, setTypesGuitars] = useState<string []>([]);
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<string>('asc');

  const filteredGuitarsByType = filterGuitarsType(guitars, typesGuitars);
  const filteredGuitarsByStringCounts = filterGuitarsStringCounts(filteredGuitarsByType, stringCounts);
  const sortedGuitars = sortGuitars(selectedSort, sortDirection, filteredGuitarsByStringCounts);

  const priceMinGuitars = getPriceMinGuitars(sortedGuitars);
  const [priceMin] = useState<number>(priceMinGuitars);
  const [priceMinFilter, setPriceMinFilter] = useState<number>(priceMin);

  const priceMaxGuitars = getPriceMaxGuitars(sortedGuitars);
  const [priceMax] = useState<number>(priceMaxGuitars);
  const [priceMaxFilter, setPriceMaxFilter] = useState<number>(priceMax);

  useEffect(() => {

    const paramsEntries = new URLSearchParams(location.search).entries();
    const paramSearchObject = Object.fromEntries(paramsEntries);

    if (paramSearchObject.type) {
      setTypesGuitars(paramSearchObject.type.split(','));
    } else {
      setTypesGuitars([]);
    }

    if (paramSearchObject.stringCounts) {
      const paramSearchObjectNumber = paramSearchObject.stringCounts.split(',').map((item) => Number(item));
      setStringCounts(paramSearchObjectNumber);
    } else {
      setStringCounts([]);
    }

    if (paramSearchObject.page) {
      onChangeCurrentPage(Number(paramSearchObject.page));
    } else {
      onChangeCurrentPage(1);
    }

    if (paramSearchObject._sort) {
      setSelectedSort(paramSearchObject._sort);
    } else {
      setSelectedSort('');
    }

    if (paramSearchObject._order) {
      setSortDirection(paramSearchObject._order);
    } else {
      setSortDirection('asc');
    }

    if (paramSearchObject.price_gte && paramSearchObject.price_lte && (Number(paramSearchObject.price_gte) < Number(paramSearchObject.price_lte))) {
      if (Number(paramSearchObject.price_lte) > priceMax || Number(paramSearchObject.price_lte) < 0 || Number(paramSearchObject.price_lte) < priceMinFilter) {
        setPriceMaxFilter(priceMax);
      } else {
        setPriceMaxFilter(Number(paramSearchObject.price_lte));
      }

      if (Number(paramSearchObject.price_gte) < priceMin || Number(paramSearchObject.price_gte) > priceMax) {
        setPriceMinFilter(priceMin);
      } else {
        setPriceMinFilter(Number(paramSearchObject.price_gte));
      }
    } else {
      setPriceMinFilter(priceMin);
      setPriceMaxFilter(priceMax);
    }

  }, [location.search]);

  const filteredGuitarsByPrice = filterGuitarsPrice(priceMinFilter, priceMaxFilter, sortedGuitars);

  //для вывода нужных гитар на странице
  const guitarsPage = filteredGuitarsByPrice.slice(firstGuitarIndex, lastGuitarIndex);

  const stringCountsData = getStringCounts(guitars);
  const typesGuitarsData = getTypesGuitars(guitars);
  const stringCountsForTypes = getStringCountsForTypes(guitars, typesGuitars);
  const typeGuitarsForString = getTypeGuitarsForString(guitars, stringCounts);

  const disabledStringCounts: number[] = getDisabledStringCounts(stringCountsForTypes, stringCountsData);
  const disabledTypesGuitars: string[] = getDisabledTypesGuitars(typeGuitarsForString, typesGuitarsData);

  const checkedStringCounts: number[] = getCheckedStringCounts(stringCountsForTypes, stringCounts);
  const checkedTypesGuitars: string[] = getCheckedTypesGuitars(typeGuitarsForString, typesGuitars);

  const handleChangeMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPriceMinFilter(Number(e.target.value));
  };

  const handleChangeMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPriceMaxFilter(Number(e.target.value));
  };

  const handleBlurInputPriceMin = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < priceMin || Number(e.target.value) > priceMax) {
      e.target.value = priceMin.toString();
    }
    setPriceMinFilter(Number(e.target.value));
    const queryString = getQueryString(typesGuitars, stringCounts, selectedSort, sortDirection, Number(e.target.value), priceMaxFilter);
    historyPush(queryString);

  };

  const handleBlurInputPriceMax = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > priceMax || !e.target.value.length || Number(e.target.value) < 0 || Number(e.target.value) < priceMinFilter) {
      e.target.value = priceMax.toString();
    }
    setPriceMaxFilter(Number(e.target.value));
    const queryString = getQueryString(typesGuitars, stringCounts, selectedSort, sortDirection, priceMinFilter, Number(e.target.value));
    historyPush(queryString);

  };

  const handleInputTypesGuitarChange = (typeGuitar: string) => {

    if (!typesGuitars.includes(typeGuitar)) {
      const queryString = getQueryString([...typesGuitars, typeGuitar], stringCounts, selectedSort, sortDirection, priceMinFilter, priceMaxFilter);
      historyPush(queryString);
    } else {
      const newTypesGuitars = typesGuitars.filter((item) => item !== typeGuitar);
      const queryString = getQueryString([...newTypesGuitars], stringCounts, selectedSort, sortDirection, priceMinFilter, priceMaxFilter);
      historyPush(queryString);
    }
  };

  const handleInputStringsChange = (stringCount: number) => {

    if (!stringCounts.includes(stringCount)) {
      //setStringCounts([...stringCounts, stringCount]);
      const queryString = getQueryString(typesGuitars, [...stringCounts, stringCount], selectedSort, sortDirection, priceMinFilter, priceMaxFilter);
      historyPush(queryString);
    } else {
      const newStringCounts = stringCounts.filter((item) => item !== stringCount);
      //setStringCounts([...newStringCounts]);
      const queryString = getQueryString(typesGuitars, [...newStringCounts], selectedSort, sortDirection, priceMinFilter, priceMaxFilter);
      historyPush(queryString);
    }
  };

  const handleChangeSort = (newSelectedSort: string) => {
    const queryString = getQueryString(typesGuitars, stringCounts, newSelectedSort, sortDirection, priceMinFilter, priceMaxFilter);
    historyPush(queryString);
  };

  const handleChangeSortDirection = (newSortDirection: string) => {
    const queryString = getQueryString(typesGuitars, stringCounts, selectedSort, newSortDirection, priceMinFilter, priceMaxFilter);
    historyPush(queryString);
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
                  typesGuitarsData.map((item) => (
                    <div className="form-checkbox catalog-filter__block-item" key={item}>
                      <input className="visually-hidden" type="checkbox" id={item} name={item}
                        checked={checkedTypesGuitars.includes(item)}
                        disabled={disabledTypesGuitars.includes(item)}
                        onChange={() => handleInputTypesGuitarChange(item)}
                      />
                      <label htmlFor={item}>{getNameTypeGuitar(item)}</label>
                    </div>
                  ))
                }
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Количество струн</legend>

                {
                  stringCountsData.map((item) => (
                    <FilterElementString key={item} item={item} checked={checkedStringCounts.includes(item)} disabled={disabledStringCounts.includes(item)} handleInputStringsChange={handleInputStringsChange} />
                  ))
                }

              </fieldset>
            </form>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                {
                  listOptions.map((item) => item === selectedSort
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
                  sortDirection === 'asc'
                    ? (
                      <>
                        <button className="catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active" aria-label="По возрастанию" tabIndex={-1} >
                        </button>
                        <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию" onClick={() => handleChangeSortDirection('desc')} >
                        </button>
                      </>
                    )
                    : (
                      <>
                        <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию" tabIndex={-1}  onClick={() => handleChangeSortDirection('asc')}>
                        </button>
                        <button className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active" aria-label="По убыванию" >
                        </button>
                      </>
                    )
                }
              </div>
            </div>

            <CatalogCards guitars={guitarsPage} />

            <Pagination
              currentPage={currentPage}
              guitarsPerPage={guitarsPerPage}
              guitarsTotalCount={filteredGuitarsByPrice.length}
              portionSize={portionSize}
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
