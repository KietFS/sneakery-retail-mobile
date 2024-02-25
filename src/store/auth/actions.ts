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

export const logOutAccount = createAction(authReducerKey + '/logOutAccount');

export const deposit = createAction<{
  userId: number;
  chargeAmount: number;
  token: string;
}>(authReducerKey + '/deposit');

export const refreshWallet = createAction<{userId: number}>(
  authReducerKey + '/refreshWallet',
);

export const getAddressInfo = createAction<{accessToken: string}>(
  authReducerKey + '/getAddressInfo',
);
