export enum APIRoute {
  Guitars = '/guitars',
  Comments = '/comments',
}

export enum AppRoute {
  Main = '/',
  Product = '/product/:id',
  NotFound = '/not-found',
}

export const RATING_MAX = 5;
export const DELAY_MS = 500;
export const PRICE_MIN = 1700;
export const PRICE_MAX = 35000;
export const STRING_COUNTS_DATA = ['4', '6', '7', '12'];
export const TYPES_GUITARS_DATA = ['acoustic', 'electric', 'ukulele'];
export const LIST_OPTIONS = ['price', 'rating'];
export const REVIEWS_COUNT = 3;

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

export const PRICE_FOR_TYPE = {
  'acoustic': {min: 1700, max: 14900},
  'electric': {min: 14900, max: 35000},
  'ukulele': {min: 1900, max: 6800},
};

export const RATING_NAME = ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];

export const START_PAGE = '1';
export const PER_PAGE = 9;

export const DEFAULT_QUERIES = {
  page: START_PAGE,
  perPage: PER_PAGE,
  type: [],
  stringCount: [],
  comments: true,
};

export const MODAL_REVIEW_HEIGHT = 610;
export const MODAL_REVIEW_WIDTH = 550;
export const MODAL_REVIEW_MARGIN_BOTTOM = 50;

export const MODAL_THANKS_HEIGHT = 410;
export const MODAL_THANKS_WIDTH = 550;
export const MODAL_THANKS_MARGIN_BOTTOM = 50;
