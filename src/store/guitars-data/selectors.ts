import {State} from './../../types/state';
import {NameSpace} from '../root-reducer';
import {GuitarsType} from '../../types/guitars';
import {GuitarsQuery} from '../../types/guitars-query';

export const getGuitars = (state: State): GuitarsType => state[NameSpace.Data].guitars;
export const getTotalCountGuitars = (state: State): number => state[NameSpace.Data].total;
export const getLoadingGuitars = (state: State): boolean => state[NameSpace.Data].loading;
export const getErrorGuitars = (state: State): boolean => state[NameSpace.Data].error;
export const getQueryParams = (state: State): GuitarsQuery => state[NameSpace.Data].params;
