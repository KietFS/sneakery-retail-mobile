import {put, takeLatest, all, call, takeEvery} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {
  deposit,
  logOutAccount,
  postRegisterAccount,
  postSignInAccount,
  refreshWallet,
} from './actions';
import {authReducerActions} from './slice';
import axios from 'axios';
import {
  depositService,
  getWalletInfoService,
  postSignIn,
  registerService,
} from './services';
import {navigateAndSimpleReset, navigationRef} from '../../utils/navigate';
import {Alert} from 'react-native';
import {Linking} from 'react-native';

function* signIn(action: PayloadAction<any>): any {
  yield put(authReducerActions.setIsSignInLoading(true));

  const response = yield call(
    postSignIn,
    action.payload.email,
    action.payload.password,
  );

  if (response?.data?.data) {
    yield put(authReducerActions.setIsSignInLoading(false));
    yield put(authReducerActions.setAccessToken(response?.data?.data?.token));
    yield put(authReducerActions.setUserInfo(response?.data?.data));
    const walletResponse = yield call(
      getWalletInfoService,
      response?.data?.data?.id,
    );

    if (walletResponse) {
      yield put(
        authReducerActions.setAccountBalance(
          walletResponse?.data?.data?.balance,
        ),
      );
    }

    navigateAndSimpleReset('MAIN' as never);
  } else {
    yield put(authReducerActions.setIsSignInLoading(false));
    Alert.alert(
      'Đăng nhập thất bại vui lòng thử lại sau, có thể bạn chưa xác nhận email của mình',
    );
  }
}

function* register(action: PayloadAction<any>): any {
  yield put(authReducerActions.setIsRegisterLoading(true));

  const response = yield call(
    registerService,
    action.payload.email,
    action.payload.password,
    action.payload.username,
    action.payload?.phoneNumber,
  );

  console.log('RESPONSE IS', response?.data);

  if (!!response?.data?.success) {
    navigationRef.navigate('Login' as never);
    Alert.alert('Đăng ký thành công, vui lòng kiểm tra email của bạn');
    yield put(authReducerActions.setIsRegisterLoading(false));
  } else {
    Alert.alert(
      response?.data?.message ||
        'Đăng ký thất bại, vui lòng kiểm tra thông tin và thử lại sau',
    );
  }
}

function* refreshWalletSaga(action: PayloadAction<any>): any {
  const walletResponse = yield call(
    getWalletInfoService,
    action.payload.userId,
  );
  if (walletResponse?.data) {
    yield put(
      authReducerActions.setAccountBalance(walletResponse?.data?.data?.balance),
    );
  } else {
    Alert.alert('Không thể làm mới thông tin ví, xin hãy thử lại sau');
  }
}

function* watchPostLogoutAccount() {
  // TODO handle postLogoutApi
  yield put(authReducerActions.setAccessToken(null));
  navigateAndSimpleReset('Welcome' as never);
}

function* depositToAPI(action: PayloadAction<any>): any {
  yield put(authReducerActions.setIsDepositting(true));

  const response = yield call(
    depositService,
    action.payload.userId,
    action.payload.chargeAmount,
    action.payload.token,
  );

  if (response?.data) {
    Linking.openURL(response?.data?.message);
    yield put(authReducerActions.setIsDepositting(false));
  } else {
    Alert.alert('Nạp tiền vào ví không thành công thành công, hãy thử lại sau');
    yield put(authReducerActions.setIsDepositting(false));
  }
}

export default function* authSaga(): any {
  yield all([
    yield takeEvery(postSignInAccount, signIn),
    yield takeLatest(logOutAccount, watchPostLogoutAccount),
    yield takeLatest(deposit, depositToAPI),
    yield takeLatest(refreshWallet, refreshWalletSaga),
    yield takeLatest(postRegisterAccount, register),
  ]);
}
