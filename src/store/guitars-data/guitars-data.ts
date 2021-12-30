import {Actions, ActionType} from '../../types/action';
import {GuitarsData} from '../../types/guitars';

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
  },
  comments: [],
  stringCounts: [],
  isDataLoaded: false,
};

const guitarsData = (state: GuitarsData = initialState, action: Actions): GuitarsData => {
  switch (action.type) {
    case ActionType.LoadGuitars:
      return {...state, guitars: action.payload, isDataLoaded: true};
    case ActionType.LoadGuitar:
      return {...state, guitar: action.payload};
    case ActionType.LoadComments:
      return {...state, comments: action.payload};
    default:
      return state;
  }
};

export {guitarsData};
