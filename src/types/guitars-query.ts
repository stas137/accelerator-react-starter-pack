export type GuitarsQuery = {
  page: number,
  perPage: number,
  type: string[],
  stringCount: string[],
  minPrice?: number,
  maxPrice?: number,
  _sort?: string,
  _order?: 'asc' | 'desc',
  name?: string,
  nameLike?: string[],
  comments: boolean,
};
