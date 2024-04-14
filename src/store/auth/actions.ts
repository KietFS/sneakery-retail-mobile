import {createAction} from '@reduxjs/toolkit';
import {authReducerKey} from './slice';

export const postSignInAccount = createAction<{
  email: string;
  password: string;
}>(authReducerKey + '/postSignInAccount');

export const postRegisterAccount = createAction<{
  email: string;
  password: string;
  username: string;
  phoneNumber?: string;
}>(authReducerKey + '/postRegisterAccount');

export const postVerifyOTP = createAction<{
  userId: string;
  code: string;
}>(authReducerKey + '/postVerifyOTP');

export const updateUserProfile = createAction<{
  username: string;
  phoneNumber: string;
  address?: string;
}>(authReducerKey + '/updateUserProfile');

export const logOutAccount = createAction(authReducerKey + '/logOutAccount');
