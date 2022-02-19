import {combineReducers} from '@reduxjs/toolkit';
import {guitarsData} from './guitars-data/guitars-data';
import {bookProcess} from './book-process/book-process';
import {searchData} from './search-data/search-data';
import {cartProcess} from './cart-process/cart-process';
import { modalData } from './modal-data/modal-data';

export enum NameSpace {
  Data = 'DATA',
  Book = 'BOOK',
  Search = 'SEARCH',
  Cart = 'CART',
  Modal = 'MODAL'
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: guitarsData,
  [NameSpace.Book]: bookProcess,
  [NameSpace.Search]: searchData,
  [NameSpace.Cart]: cartProcess,
  [NameSpace.Modal]: modalData,
});

export type RootState = ReturnType<typeof rootReducer>;
