import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {getCartItems} from '../store/cart/actions';
import {IAddToCartPayload} from '@/store/@types';

const useCart = () => {
  const {cartItems: storeCartItems, isCheckingOutCart} = useSelector(
    (state: RootState) => state.cartReducer,
  );
  const dispatch = useDispatch();

  const dispatchGetCartItems = () => {
    dispatch(getCartItems());
  };

  const cartItems = storeCartItems as any;

  return {
    cartItems,
    dispatchGetCartItems,
    isCheckingOutCart,
  };
};

export default useCart;
