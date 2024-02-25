import {createAction} from '@reduxjs/toolkit';
import {productReducerKey} from './slice';
import {IProductCondition} from '../../types';

export const getProductHomePages = createAction(
  productReducerKey + '/getProductHomePages',
);

export const getProductDetail = createAction<{id: string}>(
  productReducerKey + '/getProductDetail',
);

export const bidProduct = createAction<{
  id: string;
  accessToken: string;
  bidValue: number;
}>(productReducerKey + '/bidProduct');

export const filterProducts = createAction<{
  keyWord: string | null;
  priceStart: string | null;
  priceEnd: string | null;
  condition: IProductCondition | null;
  category: string | null;
  brand: string[];
  color: string[];
  size: string[];
}>(productReducerKey + '/filterProducts');
