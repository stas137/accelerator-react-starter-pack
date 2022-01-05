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
  guitar: {
    id: number,
    name: string,
    vendorCode: string,
    type: string,
    description: string,
    previewImg: string,
    stringCount: number,
    rating: number,
    price: number,
  },
  comments: CommentType[],
  stringCounts: number[],
  isDataLoaded: boolean,
};

export type BookProcess = {
  selectedSort: string,
  sortDirection: string,
  directionsOptions: string[],
  selectedOfferId: number | null,
  listOptions: string[],
  currentPage: number,
};

export type GuitarsType = GuitarType[];
export type CommentsType = CommentType[];
