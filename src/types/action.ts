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
  setSearchQueryParams,
  cartAddGuitar,
  cartSubGuitar,
  cartDelGuitar,
  cartSetCountGuitar,
  loadCoupon,
  setGuitarModal,
  setShowModalCardAdd,
  setShowModalCardDel,
  setShowModalSuccess
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
  SetSearchQueryParams = 'main/setSearchQueryParams',
  CartAddGuitar = 'main/cartAddGuitar',
  CartSubGuitar = 'main/cartSubGuitar',
  CartDelGuitar = 'main/cartDelGuitar',
  CartSetCountGuitar = 'main/cartSetCountGuitar',
  LoadCoupon = 'main/loadCoupon',
  SetGuitarModal = 'main/setGuitarModal',
  SetShowModalCardAdd = 'main/setShowModalCardAdd',
  SetShowModalCardDel = 'main/setShowModalCardDel',
  SetShowModalSuccess = 'main/setShowModalSuccess'
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
  | ReturnType<typeof setSearchQueryParams>
  | ReturnType<typeof cartAddGuitar>
  | ReturnType<typeof cartSubGuitar>
  | ReturnType<typeof cartDelGuitar>
  | ReturnType<typeof cartSetCountGuitar>
  | ReturnType<typeof loadCoupon>
  | ReturnType<typeof setGuitarModal>
  | ReturnType<typeof setShowModalCardAdd>
  | ReturnType<typeof setShowModalCardDel>
  | ReturnType<typeof setShowModalSuccess>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
