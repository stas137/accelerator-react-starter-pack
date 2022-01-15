import {GuitarsQuery} from '../types/guitars-query';
import {stringify, parse} from 'query-string';
import {RequestAdapterReturnType} from '../types/request-adapter';
import {STRING_COUNT_FOR_TYPE, TYPE_FOR_STRING_COUNT} from './const';
import * as H from 'history';

export const convertPath = (path: string): string => {
  const pathParts = path.split('/');
  return `/${pathParts[0]}/content/${pathParts[1]}`;
};

export const guitarRequestAdapter = (queryParams: GuitarsQuery): RequestAdapterReturnType => {

  const _start = (queryParams.page - 1) * queryParams.perPage;
  const result: RequestAdapterReturnType = {
    _start,
    _end: _start + queryParams.perPage,
  };

  if (queryParams._sort) {
    result._sort = queryParams._sort;
    result._order = queryParams._order || 'asc';
  }

  if (queryParams.type.length) {
    result.type = queryParams.type;
  }

  if (queryParams.stringCount.length) {
    result.stringCount = queryParams.stringCount;
  }

  if (queryParams.minPrice && queryParams.maxPrice) {
    result['price_gte'] = queryParams.minPrice;
    result['price_lte'] = queryParams.maxPrice;
  }

  if (queryParams.comments) {
    result._embed = 'comments';
  }

  if (queryParams.nameLike) {
    result['name_like'] = queryParams.nameLike;
  }

  return result;
};

const setQueryToUrl = (searchParams: string, location: H.Location, history: H.History): void => {
  const newUrl = searchParams.length
    ? `${location.pathname}?${searchParams}`
    : `${location.pathname}`;

  history.replace(newUrl);
};

const parseQueryParams = (location: H.Location):GuitarsQuery => parse(location.search) as unknown as GuitarsQuery;

export const addQueryParams = (query: Partial<GuitarsQuery>, location: H.Location, history: H.History): GuitarsQuery => {
  const searchParams: GuitarsQuery = parseQueryParams(location);
  const newParams:GuitarsQuery = { ...searchParams, ...query };

  if (Number(newParams.page) === 1 || (Number(newParams.page) > 1 && ((newParams.type?.length) || (newParams.stringCount?.length)))) {
    const paramsWithoutPage: Partial<GuitarsQuery> = {...newParams};
    delete paramsWithoutPage.page;
    setQueryToUrl(stringify(paramsWithoutPage), location, history);

    newParams.page = 1;
  } else {
    setQueryToUrl(stringify(newParams), location, history);
  }

  return newParams;
};


export const getNameTypeGuitar = (type: string): string => {
  switch (type) {
    case 'acoustic':
      return 'Акустические гитары';
    case 'electric':
      return 'Электрические';
    case 'ukulele':
      return 'Укулеле';
    default:
      return '';
  }
};

export const getNameSort = (type: string): string => {
  switch (type) {
    case 'price':
      return 'по цене';
    case 'rating':
      return 'по популярности';
    default:
      return '';
  }
};

export const getStringCountsForTypes = (type: string): string[] | undefined => {
  for (const [key, value] of Object.entries(STRING_COUNT_FOR_TYPE)) {
    if (key === type) {
      return value;
    }
  }
};

export const getTypesForStringCount = (stringCount: string): string[] | undefined => {
  for (const [key, value] of Object.entries(TYPE_FOR_STRING_COUNT)) {
    if (key === stringCount) {
      return value;
    }
  }
};

