import { takeLatest, all, put, call, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  getProductHomePages,
  getProductDetail,
  bidProduct,
  filterProducts,
} from './actions'
import {
  bidProductService,
  filterProductServices,
  getAdidasProductsService,
  getLVProductsService,
  getNikeProductsService,
  getProductBidHistoryService,
  getProductDetailService,
  getPumaProductsService,
} from './services'
import { productReducerActions } from './slice'
import { Alert } from 'react-native'

function* getProductsHomePageFromAPI(action: PayloadAction<any>): any {
  yield put(productReducerActions.setIsGettingHomePage(true))

  const [nikeResponse, adidasResponse, pumaResponse, lvResponse] = yield all([
    call(getNikeProductsService),
    call(getAdidasProductsService),
    call(getPumaProductsService),
    call(getLVProductsService),
  ])

  if (nikeResponse?.data) {
    yield put(productReducerActions.setNikeProducts(nikeResponse?.data?.data))
  }

  if (adidasResponse?.data) {
    yield put(
      productReducerActions.setAdidasProducts(
        adidasResponse?.data?.data?.products,
      ),
    )
  }

  if (pumaResponse?.data) {
    yield put(
      productReducerActions.setPumaProducts(pumaResponse?.data?.data?.products),
    )
  }

  if (lvResponse?.data) {
    yield put(
      productReducerActions.setLVProducts(lvResponse?.data?.data?.products),
    )
  }

  yield put(productReducerActions.setIsGettingHomePage(false))
}

function* getProductDetailFromAPI(action: PayloadAction<any>): any {
  yield put(productReducerActions.setIsGettingProductDetail(true))

  const response = yield call(getProductDetailService, action.payload.id)
  const bidHistoryResponse = yield call(
    getProductBidHistoryService,
    action.payload.id,
  )

  if (response?.data?.data) {
    yield put(productReducerActions.setProductDetail(response?.data?.data))
    yield put(
      productReducerActions?.setProductBidHistory(
        bidHistoryResponse?.data?.data || [],
      ),
    )
    yield put(productReducerActions.setIsGettingProductDetail(false))
  } else {
    yield put(productReducerActions.setIsGettingProductDetail(false))
  }
}

function* bidProductToAPI(action: PayloadAction<any>): any {
  yield put(productReducerActions.setIsBiddingProduct(true))

  const response = yield call(
    bidProductService,
    action.payload.id,
    action.payload.accessToken,
    action.payload.bidValue,
  )

  if (response?.data) {
    Alert.alert('Bid sản phẩm thành công')
    yield put(getProductDetail({ id: action.payload.id }))
    yield put(productReducerActions.setIsBiddingProduct(false))
  } else {
    Alert.alert('Bid sản phẩm thất bại,thử lại hoặc kiểm tra số dư')
    yield put(productReducerActions.setIsBiddingProduct(false))
  }
}

function* filterProductsToAPI(action: PayloadAction<any>): any {
  yield put(productReducerActions.setIsFilteringProduct(true))
  yield put(productReducerActions.setKeyWord(action.payload.keyWord))
  yield put(productReducerActions.setPriceStart(action.payload.priceStart))
  yield put(productReducerActions.setPriceEnd(action.payload.priceEnd))
  yield put(productReducerActions.setCondition(action.payload.condition))
  yield put(productReducerActions.setCategory(action.payload.category))
  yield put(productReducerActions.setBrand(action.payload.brand))
  yield put(productReducerActions.setColor(action.payload.color))
  yield put(productReducerActions.setSize(action.payload.size))

  const response = yield call(
    filterProductServices,
    action.payload.keyWord,
    action.payload.priceStart,
    action.payload.priceEnd,
    action.payload.condition,
    action.payload.category,
    action.payload.brand,
    action.payload.color,
    action.payload.size,
  )
  if (response?.data?.data) {
    console.log('FILTER DATA', response?.data?.data?.products?.length)
    yield put(
      productReducerActions.setFilterProducts(response?.data?.data?.products),
    )
    yield put(productReducerActions.setIsFilteringProduct(false))
  } else {
    yield put(productReducerActions.setIsFilteringProduct(false))
  }
}

export default function* productSaga(): any {
  yield all([
    yield takeEvery(getProductHomePages, getProductsHomePageFromAPI),
    yield takeEvery(getProductDetail, getProductDetailFromAPI),
    yield takeEvery(bidProduct, bidProductToAPI),
    yield takeLatest(filterProducts, filterProductsToAPI),
  ])
}
