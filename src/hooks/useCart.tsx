import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {checkOutCart, getCartItems} from '../store/cart/actions';

const useCart = () => {
  const {cartItems, isCheckingOutCart} = useSelector(
    (state: RootState) => state.cartReducer,
  );
  const {accessToken} = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();

  const dispatchGetCartItems = () => {
    dispatch(getCartItems({accessToken: accessToken}));
  };

  const dispatchCheckOutCart = (
    orderId: number,
    balance: number,
    shippingFee: number,
    totalPrice: number,
    token: string,
  ) => {
    dispatch(
      checkOutCart({
        orderId: orderId,
        balance: balance,
        shippingFee: shippingFee,
        totalPrice: totalPrice,
        token: token,
      }),
    );
  };

  return {
    cartItems,
    dispatchGetCartItems,
    dispatchCheckOutCart,
    isCheckingOutCart,
  };
};

export default useCart;
