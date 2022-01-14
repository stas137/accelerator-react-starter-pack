import {State} from './../../types/state';
import {NameSpace} from '../root-reducer';
import {GuitarType} from '../../types/guitars';

export const getGuitar = (state: State): GuitarType => state[NameSpace.Book].guitar;
