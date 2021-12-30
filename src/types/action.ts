import {
  loadGuitars,
  loadGuitar,
  loadComments,
  changeSort,
  changeSortDirection,
  redirectToRoute
} from '../store/action';
import {ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {State} from './state';

export enum ActionType {
  LoadGuitars = 'main/loadGuitars',
  LoadGuitar = 'main/loadGuitar',
  LoadComments = 'main/loadComments',
  ChangeSort = 'main/changeSort',
  ChangeSortDirection = 'main/changeSortDirection',
  RedirectToRoute = 'main/redirectToRoute',
}

export type Actions =
  | ReturnType<typeof loadGuitars>
  | ReturnType<typeof loadGuitar>
  | ReturnType<typeof loadComments>
  | ReturnType<typeof changeSort>
  | ReturnType<typeof changeSortDirection>
  | ReturnType<typeof redirectToRoute>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
