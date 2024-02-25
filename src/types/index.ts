export type IProductCondition = 'Used' | 'Fullbox';

export type ICategoryProps = 'Nam' | 'Nu' | 'Unisex';

export interface IProduct {
  id: string;
  name: string;
  condition: IProductCondition;
  startPrice: number;
  currentPrice: number;
  imagePath: string[];
  category: ICategoryProps;
  brand: string;
  color: string;
  size: string;
  bidIncrement: number;
  bidClosingDate: string;
}

type IRole = 'ROLE_USER';

export interface IUser {
  id: string;
  username: string;
  email: string;
  roles: IRole[];
  token: string;
}

export interface IProductHomePageResponse {
  id: string;
  name: string;
  startPrice: number;
  currentPrice: number;
  imagePath: string;
  username: string;
}

export interface IProductBidHistoryItem {
  bidAmount: number;
  createdAt: string;
  userName: string;
}

export interface ICartItem {
  id: number;
  product: {
    id: number;
    name: string;
    startPrice: 126;
    imagePath: string;
    username: string;
    bidClosingDate: string;
  };
  priceWin: number;
}
