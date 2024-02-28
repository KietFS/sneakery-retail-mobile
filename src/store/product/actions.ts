import {createAction} from '@reduxjs/toolkit';
import {productReducerKey} from './slice';
import {IProductCondition} from '../../types';

export const getProductHomePages = createAction(
  productReducerKey + '/getProductHomePages',
);

export const getProductDetail = createAction<{id: string}>(
  productReducerKey + '/getProductDetail',
);
