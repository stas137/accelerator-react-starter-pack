import {ThunkActionResult} from '../types/action';
import {loadGuitar, loadGuitars, loadGuitarsError, loadGuitarsSuccess, redirectToRoute} from './action';
import {APIRoute, AppRoute} from '../utils/const';
import {GuitarsType, GuitarType} from '../types/guitars';
import {GuitarsQuery} from '../types/guitars-query';
import {guitarRequestAdapter} from '../utils/common';

export const fetchGuitarsAction = (queryParams: GuitarsQuery): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(loadGuitars());
    try {
      const {data, headers} = await api.get<GuitarsType>(APIRoute.Guitars, {params: guitarRequestAdapter(queryParams)});
      const totalGuitars = headers['x-total-count'];

      dispatch(loadGuitarsSuccess(data, totalGuitars));
    }
    catch {
      dispatch(loadGuitarsError());
    }
  };

export const fetchGuitarAction = (guitarId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<GuitarType>(`${APIRoute.Guitars}/${guitarId}?_embed=comments`);

      dispatch(loadGuitar(data));

      const url = `/product/${guitarId}`;
      dispatch(redirectToRoute(url as AppRoute));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  };
