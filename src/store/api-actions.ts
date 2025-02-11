import {ThunkActionResult} from '../types/action';
import {
  loadCoupon,
  loadGuitar,
  loadGuitars,
  loadGuitarsError,
  loadGuitarsSuccess,
  loadSearchGuitars, loadSearchGuitarsError, loadSearchGuitarsSuccess,
  redirectToRoute
} from './action';
import {APIRoute, AppRoute} from '../utils/const';
import {CommentType, GuitarsType, GuitarType} from '../types/guitars';
import {GuitarsQuery} from '../types/guitars-query';
import {guitarRequestAdapter} from '../utils/common';

export const fetchGuitarsAction = (queryParams: GuitarsQuery): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(loadGuitars());
    try {

      const {data, headers} = await api.get<GuitarsType>(APIRoute.Guitars, {params: guitarRequestAdapter(queryParams)});
      const totalGuitars = headers['x-total-count'] || 0;

      dispatch(loadGuitarsSuccess(data, totalGuitars));
    }
    catch {
      dispatch(loadGuitarsError());
    }
  };

export const fetchSearchGuitarsAction = (queryParams: GuitarsQuery): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(loadSearchGuitars());
    try {
      const {data, headers} = await api.get<GuitarsType>(APIRoute.Guitars, {params: guitarRequestAdapter(queryParams)});
      const totalGuitars = headers['x-total-count'];

      dispatch(loadSearchGuitarsSuccess(data, totalGuitars));
    }
    catch {
      dispatch(loadSearchGuitarsError());
    }
  };

export const fetchGuitarAction = (guitarId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<GuitarType>(`${APIRoute.Guitars}/${guitarId}?_embed=comments`);

      dispatch(loadGuitar(data));

    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  };

export const fetchGuitarCommentAction = (userName: string, advantage: string, disadvantage: string, comment: string, rating: number, guitarId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.post<CommentType>(`${APIRoute.Comments}`, {userName, advantage, disadvantage, comment, rating, guitarId});

      if (response.data) {
        const {data} = await api.get<GuitarType>(`${APIRoute.Guitars}/${guitarId}?_embed=comments`);
        dispatch(loadGuitar(data));
      }

    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  };

export const fetchCouponAction = (coupon: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {

    try {
      const {data} = await api.post(APIRoute.Coupons, { coupon });
      dispatch(loadCoupon(data));
    }
    catch {
      dispatch(loadCoupon(''));
    }
  };
