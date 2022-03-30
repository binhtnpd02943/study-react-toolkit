import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { getCustomError } from '../../shared/contants/aloApi';
import { loginFailure, loginRequest, loginSuccess, logout } from './action';
import { LoginPayload } from './type';

function* handleLogin(action: LoginPayload) {
  try {
    yield delay(1000);

    localStorage.setItem('access_token', 'fake_token');
    yield put(
      loginSuccess({
        id: 1,
        name: 'Easy Frontend',
      })
    );
  } catch (error) {
    yield put(loginFailure(getCustomError(error)));
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');
  // redirect to login page
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    // const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(loginRequest.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
