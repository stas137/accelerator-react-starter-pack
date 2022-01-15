import {guitarsData} from './guitars-data';
import {makeFakeGuitar, makeFakeGuitars, makeFakeQueryParams, makeFakeTotal} from '../../utils/mock';
import {loadGuitars, loadGuitarsError, loadGuitarsSuccess, setQueryParams} from '../action';
import {ActionType} from '../../types/action';
import {DEFAULT_QUERIES} from '../../utils/const';
import {GuitarsData} from '../../types/guitars';

const initialState: GuitarsData = {
  guitars: [],
  total: 0,
  loading: false,
  error: false,
  params: DEFAULT_QUERIES,
};

const mockGuitar = makeFakeGuitar();
const mockTotal = makeFakeTotal();
const mockGuitars = makeFakeGuitars();
const mockQueryParams = makeFakeQueryParams();

describe('Reducer guitarsData:', () => {
  it('with incorrect ActionType should return initial state', () => {
    expect(guitarsData(void 0, { type: ActionType.LoadGuitar, payload: mockGuitar })).toEqual(initialState);
  });

  it('should save "guitars-data" data', () => {
    expect(guitarsData(initialState, loadGuitarsSuccess(mockGuitars, mockTotal))).toEqual({
      ...initialState,
      guitars: mockGuitars,
      total: mockTotal,
    });
  });

  it('should set "loading"', () => {
    expect(guitarsData(initialState, loadGuitars())).toEqual({
      ...initialState,
      guitars: [],
      total: 0,
      loading: true,
      error: false,
    });
  });

  it('should set "error"', () => {
    expect(guitarsData(initialState, loadGuitarsError())).toEqual({
      ...initialState,
      guitars: [],
      total: 0,
      loading: false,
      error: true,
    });
  });

  it('should save "queryParams" data', () => {
    expect(guitarsData(initialState, setQueryParams(mockQueryParams))).toEqual({
      ...initialState,
      params: mockQueryParams,
    });
  });

});
