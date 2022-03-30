import { all, call, fork, put, select, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { getCustomError } from '../../../../shared/contants/aloApi';
import studentApi from '../../../../shared/contants/studentApi';
import { Student } from '../../../../shared/model';
import { fetchStudentListRequest } from '../list/action';
import { selectStudentFilter } from '../list/reducer';
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
} from './action';
import { StudentRequestParam } from './type';

function* getStudentById(action: PayloadAction<StudentRequestParam>) {
  try {
    if (getStudentRequest.match(action)) {
      const param: StudentRequestParam = action.payload;
      const response = yield call(studentApi.getById, param.id);
      yield put(getStudentSuccess(response));
    }
  } catch (error) {
    yield put(getStudentFailure(getCustomError(error)));
  }
}

function* createStudent(action: PayloadAction<Student>) {
  try {
    if (addStudentRequest.match(action)) {
      const response = yield call(studentApi.add, action.payload);
      yield put(addStudentSuccess(response.data));
    }
  } catch (error) {
    yield put(addStudentFailure(getCustomError(error)));
  }
}

function* updateStudent(action: PayloadAction<Student>) {
  try {
    if (editStudentRequest.match(action)) {
      const response = yield call(studentApi.update, action.payload);
      yield put(editStudentSuccess(response.data));
    }
  } catch (error) {
    yield put(editStudentFailure(getCustomError(error)));
  }
}

function* watchFetchRequest() {
  yield takeLatest(getStudentRequest.type, getStudentById);
  yield takeLatest(addStudentRequest.type, createStudent);
  yield takeLatest(editStudentRequest.type, updateStudent);
}

export default function* studentFormSaga() {
  yield all([fork(watchFetchRequest)]);
}
