import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {
  checkOutCart,
  getCartItems,
  removeCartItem,
} from '../store/cart/actions';
import {IAddToCartPayload, OrderPaymentType} from '../store/@types';

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

  const dispatchCheckOutCart = (
    cartId: string[],
    address: string,
    rewardPoints?: number,
    paymentType?: OrderPaymentType,
  ) => {
    dispatch(checkOutCart({cartId, address, rewardPoints, paymentType}));
  };

  return {
    cartItems,
    dispatchGetCartItems,
    dispatchRemoveCartItem,
    dispatchCheckOutCart,
    isCheckingOutCart,
  };
};

export default useCart;
