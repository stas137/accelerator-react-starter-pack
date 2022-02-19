import {Actions, ActionType} from '../../types/action';
import {ModalData} from '../../types/guitars';

const initialState: ModalData = {
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
  showModalCardAdd: false,
  showModalCardDel: false,
  showModalSuccess: false,
};

const modalData = (state: ModalData = initialState, action: Actions): ModalData => {
  switch (action.type) {
    case ActionType.SetGuitarModal:
      return {
        ...state,
        guitar: action.payload,
      };
    case ActionType.SetShowModalCardAdd:
      return {
        ...state,
        showModalCardAdd: action.payload,
      };
    case ActionType.SetShowModalCardDel:
      return {
        ...state,
        showModalCardDel: action.payload,
      };
    case ActionType.SetShowModalSuccess:
      return {
        ...state,
        showModalSuccess: action.payload,
      };
    default:
      return state;
  }
};

export {modalData};
