import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {ThunkAppDispatch} from '../../types/action';
import {fetchGuitarAction, fetchGuitarsAction, fetchSearchGuitarsAction} from '../../store/api-actions';
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {GuitarsQuery} from '../../types/guitars-query';
import {DEFAULT_QUERIES} from '../../utils/const';
import {setSearchQueryParams} from '../../store/action';
import SelectList from '../select-list/select-list';
import {
  getErrorGuitars,
  getGuitars,
  getLoadingGuitars,
  getQueryParams
} from '../../store/search-data/selectors';
import useDebounce from '../../hooks/use-debounce';

const mapStateToProps = (state: State) => ({
  guitars: getGuitars(state),
  loading: getLoadingGuitars(state),
  error: getErrorGuitars(state),
  params: getQueryParams(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onLoadSearchGuitars(queryParams: GuitarsQuery) {
    dispatch(fetchSearchGuitarsAction(queryParams));
  },
  onLoadGuitars(queryParams: GuitarsQuery) {
    dispatch(fetchGuitarsAction(queryParams));
  },
  onClickGuitar(guitarId: number) {
    dispatch(fetchGuitarAction(guitarId));
  },
  onSetParams(queryParams: GuitarsQuery) {
    dispatch(setSearchQueryParams(queryParams));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Header({guitars, loading, error, params, onClickGuitar, onLoadSearchGuitars, onLoadGuitars, onSetParams}: PropsFromRedux): JSX.Element {

  const history = useHistory();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const handleAddQueryParams = (queries: Partial<GuitarsQuery> = {}) => {
    const queryParams: GuitarsQuery = {...DEFAULT_QUERIES, ...queries};

    onSetParams(queryParams);
    onLoadSearchGuitars(queryParams);

  };

  useEffect(() => {
    if (debouncedSearchValue) {
      handleAddQueryParams({ nameLike: debouncedSearchValue } );
    }
  }, [debouncedSearchValue]);

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((searchRef.current !== null) && (searchRef.current?.value !== '')) {

      searchRef.current.value = '';
      setSearchValue(searchRef.current.value);

      onLoadGuitars(params);
    } else {
      toast.configure();
      toast.info('Введите данные для поиска');
    }
  };

  const handleClickListItem = (guitarId: number) => {

    if (searchRef.current !== null) {
      searchRef.current.value = '';
      setSearchValue('');
    }

    history.push(`/product/${guitarId}`);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to="/">
          <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link className="link main-nav__link link--current" to="/">Каталог</Link>
            </li>
            <li>
              <Link className="link main-nav__link" to="/#">Где купить?</Link>
            </li>
            <li>
              <Link className="link main-nav__link" to="/#">О компании</Link>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form className="form-search__form" onSubmit={onSubmit}>
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg>
              <span className="visually-hidden">Начать поиск</span>
            </button>
            <input
              ref={searchRef}
              className="form-search__input"
              id="search"
              type="text"
              autoComplete="off"
              placeholder="что вы ищите?"
              onChange={handleChangeInput}
            />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>

          <SelectList
            loading={loading}
            error={error}
            searchValue={searchValue}
            guitars={guitars}
            handleClickListItem={handleClickListItem}
          />


        </div>
        <Link className="header__cart-link" to="/#" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </Link>
      </div>
    </header>
  );
}

export {Header};
export default connector(Header);
