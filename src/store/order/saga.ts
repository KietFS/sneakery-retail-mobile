import {
  all,
  put,
  call,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {cancelOrder, getOrderDetail, getOrderItems, rateOrder} from './actions';
import {orderReducerActions} from './slice';
import {
  cancelOrderService,
  getOrderDetailService,
  getOrderItemService,
  rateOrderService,
} from './services';
import {Alert} from 'react-native';
import {reloadProfile} from '../auth/actions';

function* getOrderItemsSaga(action: PayloadAction<any>): any {
  yield put(orderReducerActions.setIsGettingOrderItem(true));
  const {accessToken} = yield select(state => state.authReducer);
  const response = yield call(getOrderItemService, accessToken);

  if (response?.data?.success) {
    yield put(orderReducerActions.setOrderItems(response?.data?.results));
    yield put(orderReducerActions.setIsGettingOrderItem(false));
  } else {
    yield put(orderReducerActions.setIsGettingOrderItem(false));
    yield put(orderReducerActions.setOrderItems([]));
  }
}

function* getOrderDetailSaga(
  action: PayloadAction<{id: string | number}>,
): any {
  yield put(orderReducerActions.setIsGettingOrderDetail(true));
  const {accessToken} = yield select(state => state.authReducer);
  const response = yield call(
    getOrderDetailService,
    accessToken,
    action.payload.id,
  );

  if (response?.data?.success) {
    yield put(orderReducerActions.setOrderDetail(response?.data?.results));
    yield put(orderReducerActions.setIsCancelingOrder(false));
  } else {
    yield put(orderReducerActions.setIsCancelingOrder(false));
    yield put(orderReducerActions.setOrderDetail(null));
  }
}

function* cancelOrderSaga(action: PayloadAction<{id: string | number}>): any {
  yield put(orderReducerActions.setIsCancelingOrder(true));
  const {accessToken} = yield select(state => state.authReducer);
  const response = yield call(
    cancelOrderService,
    accessToken,
    action.payload.id,
  );

  if (response?.data?.success) {
    yield put(getOrderDetail({id: action.payload.id}));
    yield put(orderReducerActions.setIsGettingOrderDetail(false));
  } else {
    yield put(orderReducerActions.setIsGettingOrderDetail(false));
  }
}

function* rateOrderSaga(
  action: PayloadAction<{id: string | number; rate: string | number}>,
): any {
  const {accessToken, userInfo} = yield select(state => state.authReducer);
  console.log('USER INFO', userInfo);
  const response = yield call(
    rateOrderService,
    accessToken,
    action.payload.id,
    action.payload.rate,
  );

  if (response?.data?.success) {
    Alert.alert('Đánh giá đơn hàng thành công');
    yield put(getOrderDetail({id: action.payload.id}));
    yield put(reloadProfile({userId: userInfo?.userId}));
  } else {
    Alert.alert('Đánh giá đơn hàng thất bại');
  }
}

export default function* cartSaga(): any {
  yield all([
    yield takeEvery(getOrderItems, getOrderItemsSaga),
    yield takeLatest(getOrderDetail, getOrderDetailSaga),
    yield takeLatest(cancelOrder, cancelOrderSaga),
    yield takeLatest(rateOrder, rateOrderSaga),
  ]);
}
