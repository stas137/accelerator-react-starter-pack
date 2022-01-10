export type RequestAdapterReturnType = {
  _start: number,
  _end: number,
  type?: string[],
  stringCount?: string[],
  _sort?: string,
  _order?: 'asc' | 'desc',
  'price_gte'?: number,
  'price_lte'?: number,
  _name?: string,
};
