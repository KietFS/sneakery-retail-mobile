import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {getCartItems, removeCartItem} from '../store/cart/actions';
import {IAddToCartPayload} from '../store/@types';

const useCart = () => {
  const {cartItems, isCheckingOutCart} = useSelector(
    (state: RootState) => state.cartReducer,
  );
  const dispatch = useDispatch();

  const dispatchGetCartItems = () => {
    dispatch(getCartItems());
  };

  const dispatchRemoveCartItem = (id: string | number) => {
    dispatch(removeCartItem({id: id}));
  };

  return {
    cartItems,
    dispatchGetCartItems,
    dispatchRemoveCartItem,
    isCheckingOutCart,
  };
};

export default useCart;
