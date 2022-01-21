import React from 'react';
import {GuitarsType} from '../../types/guitars';

type SelectListType = {
  loading: boolean,
  error: boolean,
  searchValue: string,
  guitars: GuitarsType,
  handleClickListItem: (id: number) => void,
}

function SelectList({loading, error, searchValue, guitars, handleClickListItem}: SelectListType): JSX.Element {

  /*const handleClickList = () => {
    //handleClickListItem(id);
    /!* eslint-disable no-console *!/
    console.log('id');
    /!* eslint-enable no-console *!/
  };*/


  if (loading) {
    return (
      <ul className="form-search__select-list" data-testid="select-list-loading">
        <li
          className="form-search__select-item"
          tabIndex={0}
        >
          <img src="/img/loading.gif" style={{width: 20}} alt="loading" />
        </li>
      </ul>
    );
  }

  if (error) {
    return (
      <ul className="form-search__select-list" data-testid="select-list-error">
        <li
          className="form-search__select-item"
          tabIndex={0}
        >
          <div>Error. Try again later</div>
        </li>
      </ul>
    );
  }

  if (searchValue.length !== 0) {
    return (
      <ul className="form-search__select-list" data-testid="select-list" >
        {
          guitars.map((item) => (
            <li
              className="form-search__select-item"
              tabIndex={0}
              key={item.id}
              onMouseDown={() => handleClickListItem(item.id)}
            >
              {item.name}
            </li>))
        }
      </ul>
    );
  }

  return <div></div>;
}

export default SelectList;
