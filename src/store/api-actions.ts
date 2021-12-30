import {ThunkActionResult} from '../types/action';
import {loadComments, loadGuitar, loadGuitars, redirectToRoute} from './action';
import {APIRoute, AppRoute} from '../utils/const';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get(APIRoute.Guitars);
    dispatch(loadGuitars(data));
  };

export const fetchGuitarAction = (guitarId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const responseGuitarId = await api.get(`${APIRoute.Guitars}/${guitarId}`);

      dispatch(loadGuitar(responseGuitarId.data));

      const responseGuitarIdComments = await api.get(`${APIRoute.Guitars}/${guitarId}/comments`);

      /* eslint-disable no-console */
      console.log(responseGuitarIdComments.data);
      /* eslint-enable no-console */

      dispatch(loadComments(responseGuitarIdComments.data));

      const url = `/product/${guitarId}`;
      dispatch(redirectToRoute(url as AppRoute));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  };
