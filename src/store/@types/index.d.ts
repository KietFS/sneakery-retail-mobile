export interface IProduct {
  _id: string | number;
  name: string;
  thumbnail: string;
  price: number;
  description?: string;
  images?: string[];
  brand?: string;
  size?: number[];
}

export interface IUser {
  email: string;
  username: string;
  phoneNumber: string;
  address?: string;
}

export interface IAddToCartPayload {
  quantity: number;
  productId: number | string;
  size: number;
}

export interface ICartItemRespose extends IAddToCartPayload {
  quantity: number;
  productId: IProduct;
  size: number;
  price: number;
}

export interface IOrderItem {
  _id: string;
  userId: IUser;
  items: ICartItemRespose[];
  status: OrderStatusEnum;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatusEnum =
  | 'received'
  | 'processing'
  | 'shipping'
  | 'finished';
