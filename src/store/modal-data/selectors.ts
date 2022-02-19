import { State } from './../../types/state';
import { NameSpace } from '../root-reducer';
import { GuitarType } from '../../types/guitars';

export const getGuitarModal = (state: State): GuitarType => state[NameSpace.Modal].guitar;
export const getShowModalCardAdd = (state: State): boolean => state[NameSpace.Modal].showModalCardAdd;
export const getShowModalCardDel = (state: State): boolean => state[NameSpace.Modal].showModalCardDel;
export const getShowModalSuccess = (state: State): boolean => state[NameSpace.Modal].showModalSuccess;
