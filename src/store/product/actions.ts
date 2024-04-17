import {createAction} from '@reduxjs/toolkit';
import {productReducerKey} from './slice';

export const getProductHomePages = createAction<{page: number; limit: number}>(
  productReducerKey + '/getProductHomePages',
);

export const getProductDetail = createAction<{id: string}>(
  productReducerKey + '/getProductDetail',
);

export const getProductComments = createAction<{id: string}>(
  productReducerKey + '/getProductComments',
);

export const commentOnProduct = createAction<{id: string; content: string}>(
  productReducerKey + '/commentOnProduct',
);

export const getFilteredProducts = createAction<{
  name?: string;
  brand?: string;
  size?: number;
  category?: string;
}>(productReducerKey + '/getFilteredProducts');
