import { createReducer } from '@reduxjs/toolkit';
import { Builder } from '../../shared/helper/builder.helper';
import { loginRequest, loginFailure, loginSuccess, logout, setIsLeave } from './action';
import { AuthState } from './type';
import axios from 'axios';

const init = localStorage.getItem('token')

axios.defaults.headers.common['Authorization'] = init

export const authState = Builder<AuthState>()
  .isLoggedIn(false)
  .logging(false)
  .isLeave(false)
  .currentUser(undefined)
  .build();

export const authReducer = createReducer(authState, (builder) => {
  return builder
    .addCase(setIsLeave, (state, action) => {
      state.isLeave = action.payload.isLeave;
    })
    .addCase(loginRequest, (state, action) => {
      state.logging = true;
    })
    .addCase(loginSuccess, (state, action) => {
      state.isLoggedIn = true;
      state.logging = false;
      state.isLeave = true;
      state.currentUser = action.payload;
    })
    .addCase(loginFailure, (state, action) => {
      state.logging = false;
    })
    .addCase(logout, (state) => {
      state.isLoggedIn = false;
      state.currentUser = undefined;
      state.isLeave = false;
    });
});

export default authReducer;
export { authState as authInitialState };
