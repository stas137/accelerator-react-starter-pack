import {Actions, ActionType} from '../../types/action';
import {GuitarsData} from '../../types/guitars';
import {DEFAULT_QUERIES} from '../../utils/const';

const initialState = {
  guitars: [],
  guitar: {
    id: 0,
    name: '',
    vendorCode: '',
    type: '',
    description: '',
    previewImg: '',
    stringCount: 0,
    rating: 0,
    price: 0,
    comments: [],
  },
  total: 0,
  loading: false,
  error: false,
  params: DEFAULT_QUERIES,
};

const guitarsData = (state: GuitarsData = initialState, action: Actions): GuitarsData => {
  switch (action.type) {
    case ActionType.LoadGuitars:
      return {
        ...state,
        guitars: [],
        loading: true,
        error: false,
        total: 0,
      };
    case ActionType.LoadGuitarsSuccess:
      return {
        ...state,
        guitars: action.payload.guitars,
        loading: false,
        error: false,
        total: action.payload.total,
      };
    case ActionType.LoadGuitarsError:
      return {
        ...state,
        guitars: [],
        loading: false,
        error: true,
        total: 0,
      };
    case ActionType.LoadGuitar:
      return {
        ...state,
        guitar: action.payload,
      };
    case ActionType.SetQueryParams:
      return {
        ...state,
        params: action.payload,
      };

    default:
      return state;
  }
};

export {guitarsData};
