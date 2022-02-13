import {Actions, ActionType} from '../../types/action';
import {CardProcess} from '../../types/guitars';

const initialState: CardProcess = {
  guitars: [],
};

const cartProcess = (state: CardProcess = initialState, action: Actions): CardProcess => {
  switch (action.type) {
    case ActionType.CartAddGuitar:
      return {
        ...state,
        guitars: state.guitars.findIndex((item) => item.vendorCode === action.payload.vendorCode) > -1
          ? [...state.guitars.filter((item) => item.vendorCode !== action.payload.vendorCode),
            {
              ...action.payload,
              count: ++state.guitars[state.guitars.findIndex((item) => item.vendorCode === action.payload.vendorCode)].count,
            },
          ]
          : [...state.guitars, action.payload],
      };
    case ActionType.CartSubGuitar:
      return {
        ...state,
        guitars: state.guitars.findIndex((item) => item.vendorCode === action.payload.vendorCode) > -1
          ? [...state.guitars.filter((item) => item.vendorCode !== action.payload.vendorCode),
            {
              ...action.payload,
              count: --state.guitars[state.guitars.findIndex((item) => item.vendorCode === action.payload.vendorCode)].count,
            },
          ]
          : [...state.guitars, action.payload],
      };
    case ActionType.CartDelGuitar:
      return {
        ...state,
        guitars: [...state.guitars.filter((item) => item.vendorCode !== action.payload.vendorCode)],
      };
    case ActionType.CartSetCountGuitar:
      return {
        ...state,
        guitars: [
          ...state.guitars.filter((item) => item.vendorCode !== action.payload.vendorCode),
          {
            ...action.payload,
          },
        ],
      };
    default:
      return state;
  }
};

export {cartProcess};
