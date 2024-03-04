export interface IProduct {
  id: string | number;
  name: string;
  thumbnail: string;
  price: number;
  images?: string[];
  brand?: string;
  size?: number;
}
