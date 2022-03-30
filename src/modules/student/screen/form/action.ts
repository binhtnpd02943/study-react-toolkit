import { createAction } from "@reduxjs/toolkit";
import { CustomError } from "../../../../shared/contants/aloApi";
import { Student } from "../../../../shared/model";
import { SetIsLeave } from "../../../auth/type";
import { ActionTypes, StudentRequestParam, StudentResponse } from "./type";




export const setIsLeave = createAction<SetIsLeave>(ActionTypes.SET_IS_LEAVE)

export const getStudentRequest = createAction<StudentRequestParam>(
    ActionTypes.GET_STUDENT_DETAIL
);
export const getStudentSuccess = createAction<StudentResponse>(
    ActionTypes.GET_STUDENT_DETAIL_SUCCESS
);
export const getStudentFailure = createAction<CustomError>(
    ActionTypes.GET_STUDENT_DETAIL_FAILURE
);

export const addStudentRequest = createAction<Student>(
    ActionTypes.ADD_STUDENT_REQUEST
);

export const addStudentSuccess = createAction<StudentResponse>(
    ActionTypes.ADD_STUDENT_SUCCESS
);

export const addStudentFailure = createAction<CustomError>(
    ActionTypes.ADD_STUDENT_FAILURE
);

export const editStudentRequest = createAction<any>(
    ActionTypes.EDIT_STUDENT_REQUEST
);

export const editStudentSuccess = createAction<StudentResponse>(
    ActionTypes.EDIT_STUDENT_SUCCESS
);

export const editStudentFailure = createAction<CustomError>(
    ActionTypes.EDIT_STUDENT_FAILURE
);

