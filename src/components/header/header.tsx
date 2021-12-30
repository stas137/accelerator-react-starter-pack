import React, {SyntheticEvent, useRef, useState} from 'react';
import {State} from '../../types/state';
import {NameSpace} from '../../store/root-reducer';
import {connect, ConnectedProps} from 'react-redux';
import {GuitarsType} from '../../types/guitars';
import {ThunkAppDispatch} from '../../types/action';
import {fetchGuitarAction} from '../../store/api-actions';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mapStateToProps = (state: State) => ({
  guitars: state[NameSpace.Data].guitars,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onClickGuitar(guitarId: number) {
    dispatch(fetchGuitarAction(guitarId));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Header({guitars, onClickGuitar}: PropsFromRedux): JSX.Element {

  const searchRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState('');

  const filterGuitars = (searchString: string) => guitars.filter((item) => item.name.toLowerCase().includes(searchString.toLowerCase()));
  const filteredGuitars: GuitarsType = filterGuitars(value);

  const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (searchRef.current !== null) {
      setValue(searchRef.current.value);
    }
  };

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((searchRef.current !== null) && (searchRef.current?.value !== '')) {
      searchRef.current.value = '';
      setValue(searchRef.current.value);

      if (filteredGuitars) {
        onClickGuitar(filteredGuitars[0].id);
      }
    } else {
      toast.configure();
      toast.info('Введите данные для поиска');
    }
  };

  const handleClickListItem = (guitarId: number) => {
    /* eslint-disable no-console */
    console.log(guitarId);
    /* eslint-enable no-console */
    onClickGuitar(guitarId);
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
              <a className="link main-nav__link link--current" href="#">Каталог</a>
            </li>
            <li>
              <a className="link main-nav__link" href="#">Где купить?</a>
            </li>
            <li>
              <a className="link main-nav__link" href="#">О компании</a>
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
              onChange={onChange}
            />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>

          {
            value !== ''
              ? (
                <ul className="form-search__select-list">
                  {
                    filteredGuitars.map((item) => (
                      <li
                        className="form-search__select-item"
                        tabIndex={0}
                        key={item.id}
                        onClick={() => handleClickListItem(item.id)}
                      >
                        {item.name}
                      </li>))
                  }
                </ul>
              )
              : null
          }

        </div>
        <a className="header__cart-link" href="#" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}

export {Header};
export default connector(Header);
