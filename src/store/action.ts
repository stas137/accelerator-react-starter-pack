import {CommentsType, GuitarsType, GuitarType} from '../types/guitars';
import {ActionType} from '../types/action';
import {AppRoute} from '../utils/const';

export const loadGuitars = (guitars: GuitarsType) => ({
  type: ActionType.LoadGuitars,
  payload: guitars,
} as const);

export const loadGuitar = (guitar: GuitarType) => ({
  type: ActionType.LoadGuitar,
  payload: guitar,
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

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);
