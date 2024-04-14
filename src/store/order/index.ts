import {createAction} from '@reduxjs/toolkit';
import {orderReducerKey} from './slice';

export const getCartItems = createAction(orderReducerKey + '/getCartItems');
