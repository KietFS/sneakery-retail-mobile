import {put, takeLatest, all, call, takeEvery} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {
  logOutAccount,
  postRegisterAccount,
  postSignInAccount,
  postVerifyOTP,
} from './actions';
import {authReducerActions} from './slice';
import {postSignIn, registerService, verifyOTPService} from './services';
import {navigateAndSimpleReset, navigationRef} from '../../utils/navigate';
import {Alert} from 'react-native';

function* signIn(action: PayloadAction<any>): any {
  yield put(authReducerActions.setIsSignInLoading(true));

  const response = yield call(
    postSignIn,
    action.payload.email,
    action.payload.password,
  );

  if (response?.data?.success) {
    yield put(authReducerActions.setIsSignInLoading(false));
    yield put(
      authReducerActions.setAccessToken(response?.data?.message?.info?.token),
    );
    yield put(
      authReducerActions.setUserInfo(response?.data?.message?.info?.user),
    );
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
      //@ts-ignore
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

function* watchPostLogoutAccount() {
  // TODO handle postLogoutApi
  yield put(authReducerActions.setAccessToken(null));
  navigateAndSimpleReset('Welcome' as never);
}

export default function* authSaga(): any {
  yield all([
    yield takeEvery(postSignInAccount, signIn),
    yield takeLatest(postRegisterAccount, register),
    yield takeLatest(postVerifyOTP, verifyOTP),
    yield takeLatest(logOutAccount, watchPostLogoutAccount),
  ]);
}
