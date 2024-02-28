import {takeLatest, all, put, call, takeEvery} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {getProductHomePages, getProductDetail} from './actions';
import {getProductDetailService} from './services';
import {productReducerActions} from './slice';
import {Alert} from 'react-native';

function* getProductsHomePageFromAPI(action: PayloadAction<any>): any {
  yield put(productReducerActions.setIsGettingHomePage(false));
}

function* getProductDetailFromAPI(action: PayloadAction<any>): any {
  yield put(productReducerActions.setIsGettingProductDetail(true));
  const response = yield call(getProductDetailService, action.payload.id);
}

export default function* productSaga(): any {
  yield all([
    yield takeEvery(getProductHomePages, getProductsHomePageFromAPI),
    yield takeEvery(getProductDetail, getProductDetailFromAPI),
  ]);
}
