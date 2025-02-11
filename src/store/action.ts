import { CartType, CommentsType, GuitarsType, GuitarType } from '../types/guitars';
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

export const loadSearchGuitars = () => ({
  type: ActionType.LoadSearchGuitars,
} as const);

export const loadSearchGuitarsSuccess = (guitars: GuitarsType, total: number) => ({
  type: ActionType.LoadSearchGuitarsSuccess,
  payload: { guitars, total },
} as const);

export const loadSearchGuitarsError = () => ({
  type: ActionType.LoadSearchGuitarsError,
} as const);

export const loadGuitar = (guitar: GuitarType) => ({
  type: ActionType.LoadGuitar,
  payload: guitar,
} as const);

export const setQueryParams = (queryParams: GuitarsQuery) => ({
  type: ActionType.SetQueryParams,
  payload: queryParams,
} as const);

export const setSearchQueryParams = (queryParams: GuitarsQuery) => ({
  type: ActionType.SetSearchQueryParams,
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

export const cartAddGuitar = (guitar: CartType) => ({
  type: ActionType.CartAddGuitar,
  payload: guitar,
} as const);

export const cartSubGuitar = (guitar: CartType) => ({
  type: ActionType.CartSubGuitar,
  payload: guitar,
} as const);

export const cartDelGuitar = (guitar: CartType) => ({
  type: ActionType.CartDelGuitar,
  payload: guitar,
} as const);

export const cartSetCountGuitar = (guitar: CartType) => ({
  type: ActionType.CartSetCountGuitar,
  payload: guitar,
} as const);

export const loadCoupon = (coupon: string) => ({
  type: ActionType.LoadCoupon,
  payload: coupon,
} as const);

export const setGuitarModal = (guitar: GuitarType) => ({
  type: ActionType.SetGuitarModal,
  payload: guitar,
} as const);

export const setShowModalCardAdd = (flag: boolean) => ({
  type: ActionType.SetShowModalCardAdd,
  payload: flag,
} as const);

export const setShowModalCardDel = (flag: boolean) => ({
  type: ActionType.SetShowModalCardDel,
  payload: flag,
} as const);

export const setShowModalSuccess = (flag: boolean) => ({
  type: ActionType.SetShowModalSuccess,
  payload: flag,
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);
