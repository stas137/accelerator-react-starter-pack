import {cartProcess} from './cart-process';
import {makeFakeGuitar} from '../../utils/mock';
import {cartAddGuitar} from '../action';
import {ActionType} from '../../types/action';

const initialState = {
  guitars: [],
};

const mockGuitar = makeFakeGuitar();

describe('Reducer cartProcess:', () => {
  it('with incorrect ActionType should return initial state', () => {
    expect(cartProcess(void 0, { type: ActionType.LoadGuitars })).toEqual(initialState);
  });

  it('should save "guitar" data', () => {
    expect(cartProcess(initialState, cartAddGuitar({ ...mockGuitar, count: 1 }))).toEqual({
      ...initialState,
      guitars: [{ ...mockGuitar, count: 1}],
    });
  });

});
