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
}

export interface IAddToCartPayload {
  quantity: number;
  productId: number | string;
  size: number;
}
