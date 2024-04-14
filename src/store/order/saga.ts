import {
  all,
  put,
  call,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {getOrderDetail, getOrderItems} from './actions';
import {orderReducerActions} from './slice';
import {getOrderDetailService, getOrderItemService} from './services';

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
    yield put(orderReducerActions.setIsGettingOrderDetail(false));
  } else {
    yield put(orderReducerActions.setIsGettingOrderDetail(false));
    yield put(orderReducerActions.setOrderDetail(null));
  }
}

export default function* cartSaga(): any {
  yield all([
    yield takeEvery(getOrderItems, getOrderItemsSaga),
    yield takeLatest(getOrderDetail, getOrderDetailSaga),
  ]);
}
