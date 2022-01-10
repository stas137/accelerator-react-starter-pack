import {combineReducers} from '@reduxjs/toolkit';
import {guitarsData} from './guitars/guitars-data';
import {bookProcess} from './book-process/book-process';

export enum NameSpace {
  Data = 'DATA',
  Book = 'BOOK',
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: guitarsData,
  [NameSpace.Book]: bookProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
