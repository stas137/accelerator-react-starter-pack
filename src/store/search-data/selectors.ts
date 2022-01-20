import {State} from './../../types/state';
import {NameSpace} from '../root-reducer';
import {GuitarsType} from '../../types/guitars';
import {GuitarsQuery} from '../../types/guitars-query';
import {createSelector} from '@reduxjs/toolkit';
import {sortedGuitars} from '../../utils/common';

export const getGuitars = (state: State): GuitarsType => state[NameSpace.Search].guitars;
export const getTotalCountGuitars = (state: State): number => state[NameSpace.Search].total;
export const getLoadingGuitars = (state: State): boolean => state[NameSpace.Search].loading;
export const getErrorGuitars = (state: State): boolean => state[NameSpace.Search].error;
export const getQueryParams = (state: State): GuitarsQuery => state[NameSpace.Search].params;
export const getSortedGuitars = createSelector(getGuitars, (guitars) => sortedGuitars(guitars));
