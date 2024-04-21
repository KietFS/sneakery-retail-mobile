import {createAction} from '@reduxjs/toolkit';
import {orderReducerKey} from './slice';
import {IAddToCartPayload} from '../@types';

export const getOrderItems = createAction<{}>(
  orderReducerKey + '/getOrderItems',
);

export const getOrderDetail = createAction<{id: string | number}>(
  orderReducerKey + '/getOrderDetail',
);

export const cancelOrder = createAction<{id: string | number}>(
  orderReducerKey + '/cancelOrder',
);
