import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '..';

import {initialState} from './slice';

const selectAuth = (state: RootState) => state.authReducer || initialState;

export const getAccessToken = createSelector(
  [selectAuth],
  state => state.accessToken,
);
