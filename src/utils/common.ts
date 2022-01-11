import {GuitarsType, GuitarType} from '../types/guitars';
import {GuitarsQuery} from '../types/guitars-query';
import {stringify, parse} from 'query-string';
import {RequestAdapterReturnType} from '../types/request-adapter';
import {STRING_COUNT_FOR_TYPE, TYPE_FOR_STRING_COUNT} from './const';

export const convertPath = (path: string):string => {
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

  if (queryParams.nameLike?.length) {
    result['name_like'] = queryParams.nameLike[0];
  }

  return result;
};

const setQueryToUrl = (searchParams: string): void => {
  const newUrl = searchParams.length
    ? `${window.location.protocol}//${window.location.host}${window.location.pathname}?${searchParams}`
    : `${window.location.protocol}//${window.location.host}${window.location.pathname}`;

  window.history.pushState({path: newUrl}, '', newUrl);
};

const parseQueryParams = ():GuitarsQuery => parse(window.location.search) as unknown as GuitarsQuery;

export const addQueryParams = (query: Partial<GuitarsQuery>): GuitarsQuery => {
  const searchParams: GuitarsQuery = parseQueryParams();
  const newParams:GuitarsQuery = { ...searchParams, ...query };
  if (newParams.page === 1) {
    const paramsWithoutPage: Partial<GuitarsQuery> = {...newParams};
    delete paramsWithoutPage.page;
    setQueryToUrl(stringify(paramsWithoutPage));
  } else {
    setQueryToUrl(stringify(newParams));
  }

  return newParams;
};

export const comparePriceLowToHigh = (a:GuitarType, b:GuitarType):number => (a.price > b.price ? 1 : -1);
export const comparePriceHighToLow = (a:GuitarType, b:GuitarType):number => (a.price > b.price ? -1 : 1);
export const compareRatingLowToHigh = (a:GuitarType, b:GuitarType):number => (a.rating > b.rating ? 1 : -1);
export const compareRatingHighToLow = (a:GuitarType, b:GuitarType):number => (a.rating > b.rating ? -1 : 1);
const compareNumberLowToHigh = (a:number, b:number):number => (a > b ? 1 : -1);
const compareStringLowToHigh = (a:string, b:string):number => (a > b ? 1 : -1);

export const sortGuitars = (selectedSort: string, sortDirection: string, guitars: GuitarsType): GuitarsType => {
  if (guitars) {
    if (sortDirection === 'asc') {
      switch (selectedSort) {
        case 'price':
          return [...guitars].sort(comparePriceLowToHigh);
        case 'rating':
          return [...guitars].sort(compareRatingLowToHigh);
        default:
          return [...guitars];
      }
    } else {
      switch (selectedSort) {
        case 'price':
          return [...guitars].sort(comparePriceHighToLow);
        case 'rating':
          return [...guitars].sort(compareRatingHighToLow);
        default:
          return [...guitars];
      }
    }
  } else {
    return guitars;
  }
};

export const getStringCounts = (guitars: GuitarsType): number[] => {
  const stringCountsAll = guitars.map((item) => item.stringCount);
  return Array.from(new Set([...stringCountsAll].sort(compareNumberLowToHigh)));
};

export const getTypesGuitars = (guitars: GuitarsType): string[] => {
  const typesGuitarsAll = guitars.map((item) => item.type);
  return Array.from(new Set([...typesGuitarsAll].sort(compareStringLowToHigh)));
};

export const filterGuitarsType = (guitars: GuitarsType, typesGuitars: string[]): GuitarsType => typesGuitars.length ? guitars.filter((item) => new Set(typesGuitars).has(item.type)) : guitars;
export const filterGuitarsStringCounts = (guitars: GuitarsType, stringCounts: number[]): GuitarsType => stringCounts.length ? guitars.filter((item) => new Set(stringCounts).has(item.stringCount)) : guitars;

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

export const getStringCountsForTypes = (type: string): string[] | undefined => { //(guitarsData: GuitarsType, typesGuitars: string[]): number[] => {
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

export const getCheckedStringCounts = (stringCountsForTypes: number[], stringCounts: number[]) => {
  if (stringCountsForTypes.length) {
    return stringCounts.filter((item) => stringCountsForTypes.includes(item));
  } else {
    return [...stringCounts];
  }
};

export const getCheckedTypesGuitars = (typeGuitarsForString: string[], typesGuitars: string[]) => {
  if (typeGuitarsForString.length) {
    return typesGuitars.filter((item) => typeGuitarsForString.includes(item));
  } else {
    return [...typesGuitars];
  }
};

export const getDisabledStringCounts = (stringCountsForTypes: number[], stringCountsData: number[]) => {
  if (stringCountsForTypes.length) {
    return stringCountsData.filter((item) => !stringCountsForTypes.includes(item));
  } else {
    return [];
  }
};

export const getDisabledTypesGuitars = (typeGuitarsForString: string[], typesGuitarsData: string[]) => {
  if (typeGuitarsForString.length) {
    return typesGuitarsData.filter((item) => !typeGuitarsForString.includes(item));
  } else {
    return [];
  }
};


export const getPriceMinGuitars = (guitars: GuitarsType): number => {
  const priceList: number[] = guitars.map((guitar) => guitar.price);
  return Math.min(...priceList);
};

export const getPriceMaxGuitars = (guitars: GuitarsType): number => {
  const priceList: number[] = guitars.map((guitar) => guitar.price);
  return Math.max(...priceList);
};

export const filterGuitarsPrice = (priceMinFilter: number, priceMaxFilter: number, guitars: GuitarsType): GuitarsType =>
  guitars.filter((guitar) => (guitar.price >= priceMinFilter) && (guitar.price <= priceMaxFilter));

export const getQueryString = (typesGuitars: string[], stringCounts: number[], selectedSort: string, sortDirection:string, priceMinFilter: number, priceMaxFilter: number): string => {
  const params = new URLSearchParams();

  if (typesGuitars.length) {
    params.set('type', typesGuitars.toString());
  } else {
    params.delete('type');
  }

  if (stringCounts.length) {
    params.set('stringCounts', stringCounts.toString());
  } else {
    params.delete('stringCounts');
  }

  if (selectedSort.length) {
    params.set('_sort', selectedSort);
  } else {
    params.delete('_sort');
  }

  if (sortDirection.length) {
    params.set('_order', sortDirection);
  } else {
    params.delete('_order');
  }

  if (priceMinFilter && priceMaxFilter) {
    params.set('price_gte', priceMinFilter.toString());
    params.set('price_lte', priceMaxFilter.toString());
  } else {
    params.delete('price_gte');
    params.delete('price_lte');
  }

  return params.toString().length ? `${params.toString()}` : '';
};
