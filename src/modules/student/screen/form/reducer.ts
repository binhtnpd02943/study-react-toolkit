import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Builder } from '../../../../shared/helper/builder.helper';
import { Student } from '../../../../shared/model';
import { SetIsLeave } from '../../../auth/type';
import {
  addStudentFailure,
  addStudentRequest,
  addStudentSuccess,
  editStudentFailure,
  editStudentRequest,
  editStudentSuccess,
  getStudentFailure,
  getStudentRequest,
  getStudentSuccess,
  setIsLeave,
} from './action';
import { ActionTypes, StudentFormState, StudentResponse } from './type';

export const studentEditInitialState = Builder<StudentFormState>()
  .isLoading(false)
  .isLeave(false)
  .data({} as Student)
  .informationFormUpdateStudent(null)
  .response(null)
  .build();

export const studentFormReducer = createReducer(studentEditInitialState, (builder) => {
  return builder
    .addCase(setIsLeave, (state, action: PayloadAction<SetIsLeave>) => {
      state.isLeave = action.payload.isLeave;
    })
    .addCase(getStudentRequest, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getStudentSuccess, (state, action) => {
      state.isLoading = false;
      state.informationFormUpdateStudent = action.payload;
    })
    .addCase(getStudentFailure, (state, action) => {
      state.isLoading = false;
    })
    .addCase(addStudentRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(addStudentSuccess, (state, action) => {
      state.isLoading = false;
      state.response = action.payload;
      state.isLeave = true;
    })
    .addCase(addStudentFailure, (state) => {
      state.isLoading = false;
      state.isLeave = false;
    })
    .addCase(editStudentRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(editStudentSuccess, (state, action) => {
      state.isLoading = false;
      state.response = action.payload;
      state.isLeave = true;
    })
    .addCase(editStudentFailure, (state) => {
      state.isLoading = false;
      state.isLeave = false;
    });
});

export default studentFormReducer;
