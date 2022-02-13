import {GuitarsQuery} from './guitars-query';

export type GuitarType = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
  comments: CommentType[],
};

export type CommentType = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  createAt: Date,
  guitarId: number
};

export type GuitarsData = {
  guitars: GuitarType[],
  loading: boolean,
  error: boolean,
  total: number,
  params: GuitarsQuery,
};

export type SearchData = {
  guitars: GuitarType[],
  loading: boolean,
  error: boolean,
  total: number,
  params: GuitarsQuery,
};

export type BookProcess = {
  guitar: GuitarType,
};

export type CartType = GuitarType & {
  count: number,
};

export type CardProcess = {
  guitars: CartType[],
};

export type GuitarsType = GuitarType[];
export type CommentsType = CommentType[];
