import {State} from './../../types/state';
import {NameSpace} from '../root-reducer';
import { CartType } from '../../types/guitars';

export const getCartGuitars = (state: State): CartType[] => state[NameSpace.Cart].guitars;
