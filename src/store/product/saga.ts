import {
  takeLatest,
  all,
  put,
  call,
  takeEvery,
  select,
} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {
  getProductHomePages,
  getProductDetail,
  getFilteredProducts,
  getProductComments,
  commentOnProduct,
  addToFavouriteProduct,
  getFavouriteProduct,
} from './actions';
import {
  addToFavouriteProductService,
  getFavouriteProductsService,
  getFilteredProductsService,
  getProductCommentsService,
  getProductDetailService,
  getProducts,
  postCommentOnProductService,
} from './services';
import {productReducerActions} from './slice';
import {Alert} from 'react-native';

function* getAllProductForHomePageSaga(action: PayloadAction<any>): any {
  yield put(productReducerActions.setIsGettingHomePage(true));
  try {
    const response = yield call(
      getProducts,
      action.payload.page,
      action.payload.limit,
    );
    if (response?.data?.success) {
      yield put(productReducerActions.setProducts(response?.data?.results));
      yield put(
        productReducerActions.setTotalRecords(response?.data?.totalRecords),
      );
      yield put(productReducerActions.setIsGettingHomePage(false));
    } else {
      yield put(productReducerActions.setIsGettingHomePage(false));
    }
  } catch (error) {
    yield put(productReducerActions.setIsGettingHomePage(false));
    console.log('Error when get product', error);
  }
}

function* filterProductSaga(action: PayloadAction<any>): any {
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

function* getProductDetailSaga(action: PayloadAction<any>): any {
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

function* getProductCommentsSaga(action: PayloadAction<any>): any {
  yield put(productReducerActions.setIsGettingProductComment(true));

  try {
    const response = yield call(getProductCommentsService, action.payload.id);

    if (response?.data?.success) {
      // console.log('DATA', response?.data?.results?.comments);
      yield put(productReducerActions.setIsGettingProductComment(false));
      yield put(
        productReducerActions.setProductComments(
          response?.data?.results?.comments,
        ),
      );
      yield put(productReducerActions.setIsGettingProductComment(false));
    }
  } catch (error) {
    yield put(productReducerActions.setIsGettingProductComment(false));
    console.log('ger product detail erorr', error);
  }
}

function* commentOnProductSaga(action: PayloadAction<any>): any {
  yield put(productReducerActions.setIsCommentingOnProduct(true));
  const {accessToken} = yield select(state => state.authReducer);

  try {
    const response = yield call(
      postCommentOnProductService,
      accessToken,
      action.payload.id,
      action.payload.content,
    );

    if (response?.data?.success) {
      // Alert.alert('Comment thành công');

      yield put(getProductComments({id: action.payload.id}));
      yield put(productReducerActions.setIsCommentingOnProduct(false));
    }
  } catch (error) {
    yield put(productReducerActions.setIsCommentingOnProduct(false));
    console.log('ger product detail erorr', error);
  }
}

function* addToFavouriteProductSaga(action: PayloadAction<any>): any {
  yield put(productReducerActions.setIsAddingToFavouriteProduct(true));
  const {accessToken} = yield select(state => state.authReducer);

  try {
    const response = yield call(
      addToFavouriteProductService,
      accessToken,
      action.payload.id,
    );

    if (response?.data?.success) {
      Alert.alert('Yêu thích sản phẩm thành công');
      yield put(productReducerActions.setIsAddingToFavouriteProduct(false));
    }
  } catch (error) {
    yield put(productReducerActions.setIsAddingToFavouriteProduct(false));
    console.log('Add to favourite product failed', error);
  }
}

function* getFavouriteProductSaga(action: PayloadAction<any>): any {
  yield put(productReducerActions.setIsGettingFavouriteProducts(true));
  const {accessToken} = yield select(state => state.authReducer);

  try {
    const response = yield call(getFavouriteProductsService, accessToken);
    if (response?.data?.success) {
      yield put(productReducerActions.setIsGettingFavouriteProducts(false));
      yield put(
        productReducerActions.setFavouriteProducts(
          response?.data?.results?.products,
        ),
      );
    }
  } catch (error) {
    yield put(productReducerActions.setIsGettingFavouriteProducts(false));
    console.log('Get favourite product failed', error);
  }
}

export default function* productSaga(): any {
  yield all([
    yield takeLatest(getFilteredProducts, filterProductSaga),
    yield takeEvery(getProductHomePages, getAllProductForHomePageSaga),
    yield takeEvery(getProductDetail, getProductDetailSaga),
    yield takeEvery(getProductComments, getProductCommentsSaga),
    yield takeLatest(commentOnProduct, commentOnProductSaga),
    yield takeLatest(addToFavouriteProduct, addToFavouriteProductSaga),
    yield takeLatest(getFavouriteProduct, getFavouriteProductSaga),
  ]);
}
