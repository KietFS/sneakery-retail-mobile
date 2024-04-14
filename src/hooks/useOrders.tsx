import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {
  checkOutCart,
  getCartItems,
  removeCartItem,
} from '../store/cart/actions';
import {IAddToCartPayload, IOrderItem} from '../store/@types';
import {getOrderDetail, getOrderItems} from '../store/order/actions';

const useOrders = () => {
  const {
    orderItems: reducerOrderItems,
    orderDetail: reducerOrderDetail,
    isGettingOrderItem,
    isGettingOrderDetail,
  } = useSelector((state: RootState) => state.orderReducer);
  const dispatch = useDispatch();

  const dispatchGetOrderItems = () => {
    dispatch(getOrderItems({}));
  };

  const dispatchGetOrderDetail = (id: string | number) => {
    dispatch(getOrderDetail({id: id}));
  };

  const orderItems = reducerOrderItems as IOrderItem[];
  const orderDetail = reducerOrderDetail as IOrderItem;

  return {
    orderItems,
    orderDetail,

    //loading
    isGettingOrderItem,
    isGettingOrderDetail,

    //actions
    dispatchGetOrderItems,
    dispatchGetOrderDetail,
  };
};

export default useOrders;
