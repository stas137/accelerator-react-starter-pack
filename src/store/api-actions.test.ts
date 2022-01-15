import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from 'redux';
import {APIRoute, DEFAULT_QUERIES} from '../utils/const';
import thunk from 'redux-thunk';
import {api} from '../services/api';
import {State} from '../types/state';
import {fetchGuitarsAction} from './api-actions';
import {ThunkAppDispatch} from '../types/action';
import {loadGuitars, loadGuitarsSuccess} from './action';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const mockAPI = new MockAdapter(api);

const store = mockStore();

describe('Async actions', () => {

  it('should be work correct', async () => {
    mockAPI.onGet(APIRoute.Guitars).reply(200, [], 'x-total-count');
    expect(store.getActions()).toEqual([]);
    await (store.dispatch as ThunkAppDispatch)(fetchGuitarsAction({...DEFAULT_QUERIES}));
    expect(store.getActions()).toEqual([loadGuitars(), loadGuitarsSuccess([], 0)]);
  });

});
