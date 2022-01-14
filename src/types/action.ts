import {
  loadGuitars,
  loadGuitarsSuccess,
  loadGuitarsError,
  loadSearchGuitars,
  loadSearchGuitarsSuccess,
  loadSearchGuitarsError,
  loadGuitar,
  loadComments,
  changeSort,
  changeSortDirection,
  changeCurrentPage,
  redirectToRoute,
  setQueryParams,
  setSearchQueryParams
} from '../store/action';
import {ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {State} from './state';

export enum ActionType {
  LoadGuitars = 'main/loadGuitars',
  LoadGuitarsSuccess = 'main/loadGuitarsSuccess',
  LoadGuitarsError = 'main/loadGuitarsError',
  LoadSearchGuitars = 'main/loadSearchGuitars',
  LoadSearchGuitarsSuccess = 'main/loadSearchGuitarsSuccess',
  LoadSearchGuitarsError = 'main/loadSearchGuitarsError',
  LoadGuitar = 'main/loadGuitar',
  LoadComments = 'main/loadComments',
  ChangeSort = 'main/changeSort',
  ChangeSortDirection = 'main/changeSortDirection',
  RedirectToRoute = 'main/redirectToRoute',
  ChangeCurrentPage = 'main/currentPage',
  SetQueryParams = 'main/setQueryParams',
  SetSearchQueryParams = 'main/setSearchQueryParams'
}

export type Actions =
  | ReturnType<typeof loadGuitars>
  | ReturnType<typeof loadGuitarsSuccess>
  | ReturnType<typeof loadGuitarsError>
  | ReturnType<typeof loadSearchGuitars>
  | ReturnType<typeof loadSearchGuitarsSuccess>
  | ReturnType<typeof loadSearchGuitarsError>
  | ReturnType<typeof loadGuitar>
  | ReturnType<typeof loadComments>
  | ReturnType<typeof changeSort>
  | ReturnType<typeof changeSortDirection>
  | ReturnType<typeof changeCurrentPage>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof setQueryParams>
  | ReturnType<typeof setSearchQueryParams>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
