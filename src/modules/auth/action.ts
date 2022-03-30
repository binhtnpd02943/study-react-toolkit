import { createAction } from "@reduxjs/toolkit";
import { CustomError } from "../../shared/contants/aloApi";
import { User } from "../../shared/model/user";
import { AuthLogin, LoginPayload, SetIsLeave } from "./type";


export const setIsLeave = createAction<SetIsLeave>(
    AuthLogin.SET_IS_LEAVE
    );

export const loginRequest = createAction<LoginPayload>(
    AuthLogin.LOGIN
);
export const loginSuccess = createAction<User>(
    AuthLogin.LOGIN_SUCCESS
);
export const loginFailure = createAction<CustomError>(
    AuthLogin.LOGIN_FAILURE
);
export const logout = createAction<undefined>(
    AuthLogin.LOGOUT
);
