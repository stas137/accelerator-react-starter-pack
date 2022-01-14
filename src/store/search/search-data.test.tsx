import {searchData} from './search-data';
import {makeFakeGuitar, makeFakeGuitars, makeFakeQueryParams} from '../../utils/mock';
import {loadSearchGuitars, loadSearchGuitarsError, loadSearchGuitarsSuccess, setSearchQueryParams} from '../action';
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
const mockGuitars = makeFakeGuitars();
const mockQueryParams = makeFakeQueryParams();

describe('Reducer searchData:', () => {
  it('with incorrect ActionType should return initial state', () => {
    expect(searchData(void 0, { type: ActionType.LoadGuitar, payload: mockGuitar })).toEqual(initialState);
  });

  it('should save "guitars" data', () => {
    expect(searchData(initialState, loadSearchGuitarsSuccess(mockGuitars, 5))).toEqual({
      ...initialState,
      guitars: mockGuitars,
      total: 5,
    });
  });

  it('should set "loading"', () => {
    expect(searchData(initialState, loadSearchGuitars())).toEqual({
      ...initialState,
      guitars: [],
      total: 0,
      loading: true,
      error: false,
    });
  });

  it('should set "error"', () => {
    expect(searchData(initialState, loadSearchGuitarsError())).toEqual({
      ...initialState,
      guitars: [],
      total: 0,
      loading: false,
      error: true,
    });
  });

  it('should save "queryParams" data', () => {
    expect(searchData(initialState, setSearchQueryParams(mockQueryParams))).toEqual({
      ...initialState,
      params: mockQueryParams,
    });
  });

});
