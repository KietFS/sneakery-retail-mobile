import {
  all,
  put,
  call,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {addToCart, checkOutCart, getCartItems, removeCartItem} from './actions';
import {cartReducerActions} from './slice';
import {
  addToCartService,
  checkOutCartService,
  getCartItems as getCartItemsService,
  removeCartItemService,
} from './services';
import {Alert} from 'react-native';
import {IAddToCartPayload, OrderPaymentType} from '../@types';
import {getOrderItems} from '../order/actions';

function* getCartItemsFromAPI(action: PayloadAction<any>): any {
  yield put(cartReducerActions.setIsGettingCartItems(true));
  const {accessToken} = yield select(state => state.authReducer);
  const response = yield call(getCartItemsService, accessToken);

  if (response?.data?.success) {
    yield put(cartReducerActions.setCartItems(response?.data?.results));
    yield put(cartReducerActions.setIsGettingCartItems(false));
  } else {
    yield put(cartReducerActions.setIsGettingCartItems(false));
  }
}

function* addToCartSaga(action: PayloadAction<IAddToCartPayload>): any {
  yield put(cartReducerActions.setIsGettingCartItems(true));
  const {accessToken} = yield select(state => state.authReducer);
  const response = yield call(addToCartService, accessToken, action.payload);
  if (response?.data?.success) {
    Alert.alert(
      'Thêm sản phẩm vào giỏ hàng thành công' || response?.data?.message,
    );
    yield put(getCartItems());
    yield put(cartReducerActions.setIsGettingCartItems(false));
  } else {
    Alert.alert(
      'Thêm sản phẩm vào giỏ hàng thất bại' || response?.data?.message,
    );
    yield put(cartReducerActions.setIsGettingCartItems(false));
  }
}

function* removeCartItemSaga(action: PayloadAction<{id: string}>): any {
  const {accessToken} = yield select(state => state.authReducer);
  const response = yield call(
    removeCartItemService,
    accessToken,
    action.payload.id,
  );
  if (response?.data?.success) {
    Alert.alert(
      'Xóa sản phẩm khỏi giỏ hàng thành công' || response?.data?.message,
    );
    yield put(getCartItems());
    yield put(cartReducerActions.setIsGettingCartItems(false));
  } else {
    Alert.alert(
      'Xóa sản phẩm khỏi giỏ hàng thất bại' || response?.data?.message,
    );
  }
}

function* checkOutCartSaga(
  action: PayloadAction<{
    cartId: string[];
    address: string;
    paymentType?: OrderPaymentType;
  }>,
): any {
  const {accessToken} = yield select(state => state.authReducer);
  const response = yield call(
    checkOutCartService,
    accessToken,
    action.payload.cartId,
    action.payload.address,
    action.payload?.paymentType,
  );
  if (response?.data?.success) {
    Alert.alert('Check out đơn hàng thành công' || response?.data?.message);
    yield put(getCartItems());
    yield put(getOrderItems({}));
    yield put(cartReducerActions.setIsGettingCartItems(false));
  } else {
    Alert.alert('Check out đơn hàng thất bại' || response?.data?.message);
  }
}

export default function* cartSaga(): any {
  yield all([
    yield takeEvery(getCartItems, getCartItemsFromAPI),
    yield takeLatest(addToCart, addToCartSaga),
    yield takeLatest(removeCartItem, removeCartItemSaga),
    yield takeLatest(checkOutCart, checkOutCartSaga),
  ]);
}
