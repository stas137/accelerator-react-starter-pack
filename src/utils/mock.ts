import {commerce, datatype, internet, name} from 'faker';
import {CommentType, GuitarsType, GuitarType} from '../types/guitars';
import {GuitarsQuery} from '../types/guitars-query';

export const makeFakeGuitar = (): GuitarType => ({
  id: datatype.number(),
  name: name.title(),
  vendorCode: datatype.string(),
  type: datatype.string(),
  description: commerce.productDescription(),
  previewImg: internet.avatar(),
  stringCount: datatype.number(),
  rating: datatype.number(),
  price: datatype.number(),
  comments: [],
});

export const makeFakeGuitars = (): GuitarsType => new Array(5).fill(null).map((item) => makeFakeGuitar());

export const makeFakeQueryParams = (): GuitarsQuery => ({
  page: datatype.string(),
  perPage: datatype.number(),
  type: [],
  stringCount: [],
  comments: true,
});

export const makeFakeComment = (): CommentType => ({
  id: datatype.string(),
  userName: name.title(),
  advantage: datatype.string(),
  disadvantage: datatype.string(),
  comment: commerce.productDescription(),
  rating: datatype.number(),
  createAt: new Date(datatype.datetime()),
  guitarId: datatype.number(),
});

export const makeFakeTotal = (): number => datatype.number();
export const makeFakeOrder = (): 'asc' | 'desc' => 'asc';
export const makeFakeSort = (): string => 'price';
