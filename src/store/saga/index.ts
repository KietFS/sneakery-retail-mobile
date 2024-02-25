import {all} from 'redux-saga/effects';

import authSaga from '../auth/saga';
import productSaga from '../product/saga';
import cartSaga from '../cart/saga';

export default function* rootSaga() {
  yield all([authSaga(), productSaga(), cartSaga()]);
}
