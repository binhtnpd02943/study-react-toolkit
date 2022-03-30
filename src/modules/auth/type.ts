import { User } from '../../shared/model/user';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  isLeave?: boolean
  currentUser?: User;
}

export type SetIsLeave = {
  isLeave: boolean;
};

export enum AuthLogin {

  SET_IS_LEAVE = '@@AUTH/SET_IS_LEAVE',

  LOGIN = '@@AUTH/LOGIN',
  LOGIN_SUCCESS = '@@AUTH/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@@AUTH/LOGIN_FAILURE',

  LOGOUT = '@@AUTH/LOGOUT',
}
