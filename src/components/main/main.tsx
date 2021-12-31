import CatalogCards from '../catalog-cards/catalog-cards';
import {
  filterGuitars,
  getNameTypeGuitar,
  getStringCounts,
  getStringCountsForTypes,
  getTypesGuitars,
  sortGuitars
} from '../../utils/common';
import {Dispatch} from '@reduxjs/toolkit';
import {connect, ConnectedProps} from 'react-redux';
import {changeSort, changeSortDirection} from '../../store/action';
import {State} from '../../types/state';
import {NameSpace} from '../../store/root-reducer';
import Footer from '../footer/footer';
import Header from '../header/header';
import {useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import FilterElementString from '../filter-element-string/filter-element-string';

const mapStateToProps = (state: State) => ({
  guitars: state[NameSpace.Data].guitars,
  selectedSort: state[NameSpace.Book].selectedSort,
  sortDirection: state[NameSpace.Book].sortDirection,
  listOptions: state[NameSpace.Book].listOptions,
});

const MapDispatchToProps = (dispatch: Dispatch) => ({
  onChangeSort(selectedSort: string) {
    dispatch(changeSort(selectedSort));
  },
  onChangeSortDirection(sortDirection: string) {
    dispatch(changeSortDirection(sortDirection));
  },
});

const getQueryString = (typesGuitars: string[], stringCounts: number[]) => {
  if (typesGuitars.length || stringCounts.length) {
    if (typesGuitars.length && stringCounts.length) {
      return `?type=${typesGuitars.toString()}&stringCounts=${stringCounts.toString()}`;
    } else if (typesGuitars.length) {
      return `?type=${typesGuitars.toString()}`;
    } else {
      return `?stringCounts=${stringCounts.toString()}`;
    }
  } else {
    return '/';
  }
};

const connector = connect(mapStateToProps, MapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Main({guitars, selectedSort, sortDirection, listOptions, onChangeSort, onChangeSortDirection}: PropsFromRedux):JSX.Element {

  const [stringCounts, setStringCounts] = useState<number []>([]);
  const [typesGuitars, setTypesGuitars] = useState<string []>([]);

  const history = useHistory();
  const location = useLocation();

  if ((location.search.length) && (typesGuitars.length === 0) && (stringCounts.length === 0)) {
    const paramsEntries = new URLSearchParams(location.search).entries();
    const paramSearchObject = Object.fromEntries(paramsEntries);

    if (paramSearchObject.type) {
      setTypesGuitars(paramSearchObject.type.split(','));
    }

    if (paramSearchObject.stringCounts) {
      const paramSearchObjectNumber = paramSearchObject.stringCounts.split(',').map((item) => Number(item));
      setStringCounts(paramSearchObjectNumber);
    }
  }

  const filteredGuitars = filterGuitars(guitars, stringCounts);
  const sortedGuitars = sortGuitars(selectedSort, sortDirection, filteredGuitars);

  const stringCountsData = getStringCounts(guitars);
  const typesGuitarsData = getTypesGuitars(guitars);
  const stringCountsForTypes = getStringCountsForTypes(guitars, typesGuitars);

  let checkedStringCounts: number[] = [];
  if (stringCountsForTypes.length) {
    checkedStringCounts = stringCounts.filter((item) => stringCountsForTypes.includes(item));
  } else {
    checkedStringCounts = [...stringCounts];
  }

  let disabledStringCounts: number[] = [];
  if (stringCountsForTypes.length) {
    disabledStringCounts = stringCountsData.filter((item) => !stringCountsForTypes.includes(item));
  }

  const enabledStringCounts: number[] = stringCountsData.filter((item) => !checkedStringCounts.includes(item) && !disabledStringCounts.includes(item));

  const handleInputTypesGuitarChange = (typeGuitar: string) => {
    const setOfTypesGuitars = new Set(typesGuitars);
    if (!setOfTypesGuitars.has(typeGuitar)) {
      setTypesGuitars([...typesGuitars, typeGuitar]);

      const queryString = getQueryString([...typesGuitars, typeGuitar], stringCounts);
      history.push(queryString);
    } else {
      const newTypesGuitars = typesGuitars.filter((item) => item !== typeGuitar);
      setTypesGuitars([...newTypesGuitars]);

      const queryString = getQueryString([...newTypesGuitars], stringCounts);
      history.push(queryString);
    }
  };

  const handleInputStringsChange = (stringCount: number) => {
    const setOfStringCounts = new Set(stringCounts);
    if (!setOfStringCounts.has(stringCount)) {
      setStringCounts([...stringCounts, stringCount]);

      const queryString = getQueryString(typesGuitars, [...stringCounts, stringCount]);
      history.push(queryString);

    } else {
      const newStringCounts = stringCounts.filter((item) => item !== stringCount);
      setStringCounts([...newStringCounts]);

      const queryString = getQueryString(typesGuitars, [...newStringCounts]);
      history.push(queryString);
    }
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
                    <input type="number" placeholder="1 000" id="priceMin" name="от" />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">Максимальная цена</label>
                    <input type="number" placeholder="30 000" id="priceMax" name="до" />
                  </div>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Тип гитар</legend>

                {
                  typesGuitarsData.map((item) => ( new Set(typesGuitars).has(item)
                    ? (
                      <div className="form-checkbox catalog-filter__block-item" key={item}>
                        <input className="visually-hidden" type="checkbox" id={item} name={item} checked onChange={() => handleInputTypesGuitarChange(item)}/>
                        <label htmlFor={item}>{getNameTypeGuitar(item)}</label>
                      </div>
                    )
                    : (
                      <div className="form-checkbox catalog-filter__block-item" key={item}>
                        <input className="visually-hidden" type="checkbox" id={item} name={item} checked={false} onChange={() => handleInputTypesGuitarChange(item)}/>
                        <label htmlFor={item}>{getNameTypeGuitar(item)}</label>
                      </div>
                    )
                  ))
                }

              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Количество струн</legend>

                {
                  checkedStringCounts.map((item) => (
                    <FilterElementString key={item} item={item} checked disabled={false} handleInputStringsChange={handleInputStringsChange}/>
                  ))
                }
                {
                  enabledStringCounts.map((item) => (
                    <FilterElementString key={item} item={item} checked={false} disabled={false} handleInputStringsChange={handleInputStringsChange} />
                  ))
                }
                {
                  disabledStringCounts.map((item) => (
                    <FilterElementString key={item} item={item} checked={false} disabled handleInputStringsChange={handleInputStringsChange} />
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
                        {item}
                      </button>
                    )
                    : (
                      <button
                        className="catalog-sort__type-button"
                        aria-label={item}
                        key={item}
                        onClick={() => onChangeSort(item)}
                      >
                        {item}
                      </button>
                    ),
                  )
                }

              </div>
              <div className="catalog-sort__order">
                {
                  sortDirection === 'По возрастанию'
                    ? (
                      <>
                        <button className="catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active" aria-label="По возрастанию" tabIndex={-1}  onClick={() => onChangeSortDirection('По возрастанию')}>
                        </button>
                        <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию" onClick={() => onChangeSortDirection('По убыванию')}>
                        </button>
                      </>
                    )
                    : (
                      <>
                        <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию" tabIndex={-1}  onClick={() => onChangeSortDirection('По возрастанию')}>
                        </button>
                        <button className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active" aria-label="По убыванию" onClick={() => onChangeSortDirection('По убыванию')}>
                        </button>
                      </>
                    )
                }
              </div>
            </div>

            <CatalogCards guitars={sortedGuitars} />

            <div className="pagination page-content__pagination">
              <ul className="pagination__list">
                <li className="pagination__page pagination__page--active">
                  <a className="link pagination__page-link" href="1">1</a>
                </li>
                <li className="pagination__page">
                  <a className="link pagination__page-link" href="2">2</a>
                </li>
                <li className="pagination__page">
                  <a className="link pagination__page-link" href="3">3</a>
                </li>
                <li className="pagination__page pagination__page--next" id="next">
                  <a className="link pagination__page-link" href="2">Далее</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export {Main};
export default connector(Main);
