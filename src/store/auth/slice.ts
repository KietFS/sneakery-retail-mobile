import {createSlice} from '@reduxjs/toolkit';
import {IUser} from '../../types';

export interface AuthState {
  //sign in state
  accessToken: string | null;
  isSignInLoading: boolean;
  isRegisterLoading: boolean;
  isDepositting: boolean;
  error: string | null;

  userInfo: IUser | null;
  accountBalance: number;
}

export const initialState: AuthState = {
  //sign in state
  accessToken: null,
  isSignInLoading: false,
  isRegisterLoading: false,
  isDepositting: false,
  error: null,
  userInfo: null,

  accountBalance: 0,
};

export const authSlice = createSlice({
  name: 'authReducer',
  initialState: {...initialState},
  reducers: {
    //login flow
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setIsSignInLoading: (state, action) => {
      state.isSignInLoading = action.payload;
    },
    setIsRegisterLoading: (state, action) => {
      state.isRegisterLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setAccountBalance: (state, action) => {
      state.accountBalance = action.payload;
    },
    setIsDepositting: (state, action) => {
      state.isDepositting = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authReducerKey = authSlice.name;
export const authReducerActions = authSlice.actions;
