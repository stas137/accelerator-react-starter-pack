import {GuitarsType, GuitarType} from '../types/guitars';

export const convertPath = (path: string):string => {
  const pathParts = path.split('/');
  return `/${pathParts[0]}/content/${pathParts[1]}`;
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
          break;
        case 'rating':
          return [...guitars].sort(compareRatingLowToHigh);
          break;
        default:
          return [...guitars];
          break;
      }
    } else {
      switch (selectedSort) {
        case 'price':
          return [...guitars].sort(comparePriceHighToLow);
          break;
        case 'rating':
          return [...guitars].sort(compareRatingHighToLow);
          break;
        default:
          return [...guitars];
          break;
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
      break;
    case 'electric':
      return 'Электрические';
      break;
    case 'ukulele':
      return 'Укулеле';
      break;
    default:
      return '';
      break;
  }
};

export const getNameSort = (type: string): string => {
  switch (type) {
    case 'price':
      return 'по цене';
      break;
    case 'rating':
      return 'по популярности';
      break;
    default:
      return '';
      break;
  }
};

/*export const getNameRating = (type: string): string => {
  switch (type) {
    case 'asc':
      return 'По возрастанию';
      break;
    case 'desc':
      return 'По убыванию';
      break;
    default:
      return '';
      break;
  }
};*/

export const getStringCountsForTypes = (guitars: GuitarsType, typesGuitars: string[]): number[] => {
  if (typesGuitars.length) {
    const temp: GuitarsType[] = [];
    typesGuitars.forEach((itemTypes) => temp.push(guitars.filter((item) => item.type === itemTypes)));
    const result = temp.map((item) => item.map((el) => el.stringCount));
    return Array.from(new Set(result.flat(1)));
  }
  return [];
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


export const getTypeGuitarsForString = (guitars: GuitarsType, stringCounts: number[]): string[] => {
  if (stringCounts.length) {
    const temp: GuitarsType[] = [];
    stringCounts.forEach((itemString) => temp.push(guitars.filter((item) => item.stringCount === itemString)));
    const result = temp.map((item) => item.map((el) => el.type));
    return Array.from(new Set(result.flat(1)));
  }
  return [];
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
