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

export interface ICommentItem {
  user: IUser;
  comment: string;
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
  paymentType: OrderPaymentType;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatusEnum =
  | 'new'
  | 'received'
  | 'processing'
  | 'shipping'
  | 'finished'
  | 'canceled';

export type OrderPaymentType = 'cod' | 'e-wallet';
