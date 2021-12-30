import {Actions, ActionType} from '../../types/action';
import {BookProcess} from '../../types/guitars';

const initialState = {
  selectedSort: 'по умолчанию',
  sortDirection: 'По возрастанию',
  directionsOptions: ['По возрастанию', 'По убыванию'],
  selectedOfferId: null,
  listOptions: ['по цене', 'по популярности'],
};

const bookProcess = (state: BookProcess = initialState, action: Actions): BookProcess => {
  switch (action.type) {
    case ActionType.ChangeSort:
      return {...state, selectedSort: action.payload};
    case ActionType.ChangeSortDirection:
      return {...state, sortDirection: action.payload};
    default:
      return state;
  }
};

export {bookProcess};
