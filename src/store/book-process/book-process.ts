import {Actions, ActionType} from '../../types/action';
import {BookProcess} from '../../types/guitars';

const initialState: BookProcess = {
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
};

const bookProcess = (state: BookProcess = initialState, action: Actions): BookProcess => {
  switch (action.type) {
    case ActionType.LoadGuitar:
      return {
        ...state,
        guitar: action.payload,
      };
    default:
      return state;
  }
};

export {bookProcess};
