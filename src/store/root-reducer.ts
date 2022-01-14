import {combineReducers} from '@reduxjs/toolkit';
import {guitarsData} from './guitars/guitars-data';
import {bookProcess} from './book-process/book-process';
import {searchData} from './search/search-data';

export enum NameSpace {
  Data = 'DATA',
  Book = 'BOOK',
  Search = 'SEARCH',
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: guitarsData,
  [NameSpace.Book]: bookProcess,
  [NameSpace.Search]: searchData,
});

export type RootState = ReturnType<typeof rootReducer>;
