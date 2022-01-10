export enum APIRoute {
  Guitars = '/guitars',
}

export enum AppRoute {
  Main = '/',
  Product = '/product/:id',
  NotFound = '/not-found',
}

export const PRICE_MIN = 1700;
export const PRICE_MAX = 35000;
export const STRING_COUNTS_DATA = ['4', '6', '7', '12'];
export const TYPES_GUITARS_DATA = ['acoustic', 'electric', 'ukulele'];
export const LIST_OPTIONS =  ['price', 'rating'];

export const TYPE_FOR_STRING_COUNT = {
  '4': ['electric', 'ukulele'],
  '6': ['acoustic', 'electric'],
  '7': ['acoustic', 'electric'],
  '12': ['acoustic'],
};

export const STRING_COUNT_FOR_TYPE = {
  'acoustic': ['6', '7', '12'],
  'electric': ['4', '6', '7'],
  'ukulele': ['4'],
};

export const DEFAULT_QUERIES = {
  page: 1,
  perPage: 9,
  type: [],
  stringCount: [],
  comments: true,
};
