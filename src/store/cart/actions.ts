import {createAction} from '@reduxjs/toolkit';
import {cartReducerKey} from './slice';
import {IAddToCartPayload} from '../@types';

export const getCartItems = createAction(cartReducerKey + '/getCartItems');

export const addToCart = createAction<IAddToCartPayload>(
  cartReducerKey + '/checkOutCart',
);

export const removeCartItem = createAction<{id: string | number}>(
  cartReducerKey + '/removeCartItem',
);
