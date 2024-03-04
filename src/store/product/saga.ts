import {takeLatest, all, put, call, takeEvery} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {getProductHomePages, getProductDetail} from './actions';
import {getProductDetailService, getProducts} from './services';
import {productReducerActions} from './slice';
import {Alert} from 'react-native';

function* getAllProductForHomePage(action: PayloadAction<any>): any {
  yield put(productReducerActions.setIsGettingHomePage(true));
  try {
    const response = yield call(getProducts);
    if (response?.data?.success) {
      yield put(productReducerActions.setProducts(response?.data?.results));
      console.log('GET PRODUCT HOME PAGE', response?.data?.results);
      yield put(productReducerActions.setIsGettingHomePage(false));
    } else {
      yield put(productReducerActions.setIsGettingHomePage(false));
    }
  } catch (error) {
    yield put(productReducerActions.setIsGettingHomePage(false));
    console.log('Error when get product', error);
  }
}

function* getProductDetailFromAPI(action: PayloadAction<any>): any {
  yield put(productReducerActions.setIsGettingProductDetail(true));
  const response = yield call(getProductDetailService, action.payload.id);
}

export default function* productSaga(): any {
  yield all([
    yield takeEvery(getProductHomePages, getAllProductForHomePage),
    yield takeEvery(getProductDetail, getProductDetailFromAPI),
  ]);
}
