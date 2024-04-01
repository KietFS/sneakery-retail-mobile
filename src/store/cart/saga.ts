import {
  all,
  put,
  call,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {addToCart, getCartItems} from './actions';
import {cartReducerActions} from './slice';
import {
  addToCartService,
  getCartItems as getCartItemsService,
} from './services';
import {Alert} from 'react-native';
import {IAddToCartPayload} from '../@types';

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
    yield put(cartReducerActions.setIsGettingCartItems(false));
  } else {
    Alert.alert(
      'Thêm sản phẩm vào giỏ hàng thất bại' || response?.data?.message,
    );
    yield put(cartReducerActions.setIsGettingCartItems(false));
  }
}

export default function* cartSaga(): any {
  yield all([
    yield takeEvery(getCartItems, getCartItemsFromAPI),
    yield takeLatest(addToCart, addToCartSaga),
  ]);
}
