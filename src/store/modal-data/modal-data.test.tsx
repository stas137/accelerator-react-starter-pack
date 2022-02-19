import {modalData} from './modal-data';
import {makeFakeGuitar} from '../../utils/mock';
import {
  setGuitarModal,
  setShowModalCardAdd
} from '../action';
import {ActionType} from '../../types/action';
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

const mockGuitar = makeFakeGuitar();

describe('Reducer modalData:', () => {
  it('with incorrect ActionType should return initial state', () => {
    expect(modalData(void 0, { type: ActionType.LoadGuitar, payload: mockGuitar })).toEqual(initialState);
  });

  it('should save "modal-data" data', () => {
    expect(modalData(initialState, setGuitarModal(mockGuitar))).toEqual({
      ...initialState,
      guitar: mockGuitar,
    });
  });

  it('should save "showModalCardAdd" data', () => {
    expect(modalData(initialState, setShowModalCardAdd(true))).toEqual({
      ...initialState,
      showModalCardAdd: true,
    });
  });

});
