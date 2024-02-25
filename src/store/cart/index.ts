import {createAction} from '@reduxjs/toolkit';
import {cartReducerKey} from './slice';

export const getCartItems = createAction(cartReducerKey + '/getCartItems');
