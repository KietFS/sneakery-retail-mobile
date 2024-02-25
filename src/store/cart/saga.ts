import {all, put, call, takeEvery, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {checkOutCart, getCartItems} from './actions';
import {cartReducerActions} from './slice';
import {checkOutService, getCartItems as getCartItemsService} from './services';
import {Alert} from 'react-native';

function* getCartItemsFromAPI(action: PayloadAction<any>): any {
  yield put(cartReducerActions.setIsGettingCartItems(true));

  const response = yield call(getCartItemsService, action.payload.accessToken);

  if (response?.data?.data) {
    yield put(cartReducerActions.setCartItems(response?.data?.data));
    yield put(cartReducerActions.setIsGettingCartItems(false));
  } else {
    yield put(cartReducerActions.setIsGettingCartItems(false));
  }
}

function* checkOutCartToAPI(action: PayloadAction<any>): any {
  yield put(cartReducerActions.setIsCheckingOutCart(true));

  const response = yield call(
    checkOutService,
    action.payload.orderId,
    action.payload.balance,
    action.payload.shippingFee,
    action.payload.totalPrice,
    action.payload.token,
  );
  if (response?.data) {
    Alert.alert('Đặt hàng thành công');
    yield put(cartReducerActions.setIsCheckingOutCart(false));
  } else {
    yield put(cartReducerActions.setIsCheckingOutCart(false));
  }
}

export default function* cartSaga(): any {
  yield all([
    yield takeEvery(getCartItems, getCartItemsFromAPI),
    yield takeLatest(checkOutCart, checkOutCartToAPI),
  ]);
}
