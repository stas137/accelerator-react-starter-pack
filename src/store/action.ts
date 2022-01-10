import {CommentsType, GuitarsType, GuitarType} from '../types/guitars';
import {ActionType} from '../types/action';
import {AppRoute} from '../utils/const';
import {GuitarsQuery} from '../types/guitars-query';

export const loadGuitars = () => ({
  type: ActionType.LoadGuitars,
} as const);

export const loadGuitarsSuccess = (guitars: GuitarsType, total: number) => ({
  type: ActionType.LoadGuitarsSuccess,
  payload: { guitars, total },
} as const);

export const loadGuitarsError = () => ({
  type: ActionType.LoadGuitarsError,
} as const);

export const loadGuitar = (guitar: GuitarType) => ({
  type: ActionType.LoadGuitar,
  payload: guitar,
} as const);

export const setQueryParams = (queryParams: GuitarsQuery) => ({
  type: ActionType.SetQueryParams,
  payload: queryParams,
} as const);

export const loadComments = (comments: CommentsType) => ({
  type: ActionType.LoadComments,
  payload: comments,
} as const);

export const changeSort = (selectedSort: string) => ({
  type: ActionType.ChangeSort,
  payload: selectedSort,
} as const);

export const changeSortDirection = (sortDirection: string) => ({
  type: ActionType.ChangeSortDirection,
  payload: sortDirection,
} as const);

export const changeCurrentPage = (currentPage: number) => ({
  type: ActionType.ChangeCurrentPage,
  payload: currentPage,
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);
