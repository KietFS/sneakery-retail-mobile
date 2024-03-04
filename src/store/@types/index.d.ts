export interface IProduct {
  _id: string | number;
  name: string;
  thumbnail: string;
  price: number;
  images?: string[];
  brand?: string;
  size?: number;
}
