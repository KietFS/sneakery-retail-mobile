import {createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  //sign in state
  accessToken: string | null;
  isSignInLoading: boolean;
  isVerifyOTPLoading: boolean;
  isRegisterLoading: boolean;
  error: string | null;
  deviceId: string | null;

  userInfo: any | null;
  accountBalance: number;
}

export const initialState: AuthState = {
  //sign in state
  accessToken: null,
  isSignInLoading: false,
  isRegisterLoading: false,
  isVerifyOTPLoading: false,
  error: null,
  userInfo: null,
  deviceId: '',

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
    setIsVerfiyOTPLoading: (state, action) => {
      state.isVerifyOTPLoading = action.payload;
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
    setDeviceId: (state, action) => {
      state.deviceId = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authReducerKey = authSlice.name;
export const authReducerActions = authSlice.actions;
