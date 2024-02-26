import {put, takeLatest, all, call, takeEvery} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {
  deposit,
  logOutAccount,
  postRegisterAccount,
  postSignInAccount,
  postVerifyOTP,
  refreshWallet,
} from './actions';
import {authReducerActions} from './slice';
import axios from 'axios';
import {
  getWalletInfoService,
  postSignIn,
  registerService,
  verifyOTPService,
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

  if (response?.data?.success) {
    yield put(authReducerActions.setIsSignInLoading(false));
    yield put(authReducerActions.setUserInfo(response?.data?.message?.info));
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
  if (!!response?.data?.success) {
    console.log(response?.data);
    navigationRef.navigate(
      'VerifyOTP' as never,
      {userId: response?.data?.message?.verifyID} as never,
    );
    Alert.alert('Đăng ký thành công, vui lòng kiểm tra email của bạn');
    yield put(authReducerActions.setIsRegisterLoading(false));
  } else {
    Alert.alert(
      response?.data?.message ||
        'Đăng ký thất bại, vui lòng kiểm tra thông tin và thử lại sau',
    );
  }
}

function* verifyOTP(action: PayloadAction<any>): any {
  yield put(authReducerActions.setIsRegisterLoading(true));

  const response = yield call(
    verifyOTPService,
    action.payload.userId,
    action.payload.code,
  );
  if (!!response?.data?.success) {
    navigationRef.navigate('Login' as never);
    Alert.alert('Xác nhận OTP thành công');
    yield put(authReducerActions.setIsRegisterLoading(false));
  } else {
    Alert.alert(
      response?.data?.message || 'Mã OTP của bạn không đúng, vui lòng thử lại',
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

export default function* authSaga(): any {
  yield all([
    yield takeEvery(postSignInAccount, signIn),
    yield takeLatest(postVerifyOTP, verifyOTP),
    yield takeLatest(logOutAccount, watchPostLogoutAccount),
    yield takeLatest(refreshWallet, refreshWalletSaga),
    yield takeLatest(postRegisterAccount, register),
  ]);
}
