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
    if (sortDirection === 'По возрастанию') {
      switch (selectedSort) {
        case 'по цене':
          return [...guitars].sort(comparePriceLowToHigh);
          break;
        case 'по популярности':
          return [...guitars].sort(compareRatingLowToHigh);
          break;
        default:
          return [...guitars];
          break;
      }
    } else {
      switch (selectedSort) {
        case 'по цене':
          return [...guitars].sort(comparePriceHighToLow);
          break;
        case 'по популярности':
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
  const stringCountsAll = guitars.map((item) => item.type);
  return Array.from(new Set([...stringCountsAll].sort(compareStringLowToHigh)));
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

export const getStringCountsForTypes = (guitars: GuitarsType, typesGuitars: string[]): number[] => {
  if (typesGuitars.length) {
    const temp: GuitarsType[] = [];
    typesGuitars.forEach((itemTypes) => temp.push(guitars.filter((item) => item.type === itemTypes)));
    const result = temp.map((item) => item.map((el) => el.stringCount));
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
