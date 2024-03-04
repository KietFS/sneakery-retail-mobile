import {takeLatest, all, put, call, takeEvery} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {
  getProductHomePages,
  getProductDetail,
  getFilteredProducts,
} from './actions';
import {
  getFilteredProductsService,
  getProductDetailService,
  getProducts,
} from './services';
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

function* filterProductFromAPI(action: PayloadAction<any>): any {
  yield put(productReducerActions.setIsGettingFilteredProducts(true));
  try {
    const {name, brand, size, category} = action.payload;
    const response = yield call(
      getFilteredProductsService,
      name,
      brand,
      size,
      category,
    );

    if (response?.data?.success) {
      yield put(
        productReducerActions.setFilteredProducts(response?.data?.results),
      );
      yield put(productReducerActions.setIsGettingFilteredProducts(false));
    } else {
      yield put(productReducerActions.setIsGettingFilteredProducts(false));
    }
  } catch (error) {
    yield put(productReducerActions.setIsGettingFilteredProducts(false));
    console.log('Error when get product', error);
  }
}

function* getProductDetailFromAPI(action: PayloadAction<any>): any {
  yield put(productReducerActions.setIsGettingProductDetail(true));

  try {
    const response = yield call(getProductDetailService, action.payload.id);

    if (response?.data?.success) {
      yield put(productReducerActions.setIsGettingProductDetail(false));
      yield put(
        productReducerActions.setProductDetail(response?.data?.results),
      );
      yield put(productReducerActions.setIsGettingProductDetail(false));
    }
  } catch (error) {
    yield put(productReducerActions.setIsGettingProductDetail(false));
    console.log('ger product detail erorr', error);
  }
}

export default function* productSaga(): any {
  yield all([
    yield takeLatest(getFilteredProducts, filterProductFromAPI),
    yield takeEvery(getProductHomePages, getAllProductForHomePage),
    yield takeEvery(getProductDetail, getProductDetailFromAPI),
  ]);
}
