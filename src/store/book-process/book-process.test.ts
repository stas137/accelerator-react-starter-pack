import {bookProcess} from './book-process';
import {makeFakeGuitar} from '../../utils/mock';
import {loadGuitar} from '../action';
import {ActionType} from '../../types/action';

const initialState = {
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

const mockGuitar = makeFakeGuitar();


describe('Reducer bookProcess:', () => {
  it('with incorrect ActionType should return initial state', () => {
    expect(bookProcess(void 0, { type: ActionType.LoadGuitars })).toEqual(initialState);
  });

  it('should save "guitar" data', () => {
    expect(bookProcess(initialState, loadGuitar(mockGuitar))).toEqual({
      ...initialState,
      guitar: mockGuitar,
    });
  });

});
