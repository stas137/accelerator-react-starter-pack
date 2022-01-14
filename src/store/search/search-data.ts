import {Actions, ActionType} from '../../types/action';
import {DEFAULT_QUERIES} from '../../utils/const';
import {SearchData} from '../../types/guitars';

const initialState = {
  guitars: [],
  loading: false,
  error: false,
  total: 0,
  params: {
    ...DEFAULT_QUERIES,
    comments: true,
  },
};

const searchData = (state: SearchData = initialState, action: Actions): SearchData => {
  switch (action.type) {
    case ActionType.LoadSearchGuitars:
      return {
        ...state,
        guitars: [],
        loading: true,
        error: false,
        total: 0,
      };
    case ActionType.LoadSearchGuitarsSuccess:
      return {
        ...state,
        guitars: action.payload.guitars,
        loading: false,
        error: false,
        total: action.payload.total,
      };
    case ActionType.LoadSearchGuitarsError:
      return {
        ...state,
        guitars: [],
        loading: false,
        error: true,
        total: 0,
      };
    case ActionType.SetSearchQueryParams:
      return {
        ...state,
        params: action.payload,
      };
    default:
      return state;
  }
};

export {searchData};
