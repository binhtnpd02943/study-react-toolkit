import { all, call, debounce, fork, put, select, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { getCustomError } from '../../../../shared/contants/aloApi';
import studentApi from '../../../../shared/contants/studentApi';
import { ListParams, ListResponse, Student } from '../../../../shared/model';
import {
  deleteStudentFailed,
  deleteStudentRequest,
  deleteStudentSuccess,
  fetchStudentListFailed,
  fetchStudentListRequest,
  fetchStudentListSuccess,
  setFilter,
  setFilterWithDebounce
} from './action';
import { selectStudentFilter } from './reducer';
import { studentDeleteParam } from './type';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    if (fetchStudentListRequest.match(action)) {
      const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
      yield put(fetchStudentListSuccess(response));
    }
  } catch (error) {
    yield put(fetchStudentListFailed(getCustomError(error)));
  }
}

function* handlerSearchDebounce(action: PayloadAction<ListParams>) {
  console.log('Student saga debounce', action.payload);

  yield put(setFilter(action.payload));
}

function* deleteStudent(action: PayloadAction<studentDeleteParam>) {
  try {
    if (deleteStudentRequest.match(action)) {
      const requestParams: studentDeleteParam = action.payload;
      const response = yield call(studentApi.remove, requestParams.id);

      yield put(deleteStudentSuccess(response.data));

      const filter = yield select(selectStudentFilter);
      yield put(fetchStudentListRequest(filter));
    }
  } catch (error) {
    yield put(deleteStudentFailed(getCustomError(error)));
  }
}

function* watchGetRequest() {
  // watch fetch student action
  yield takeLatest(fetchStudentListRequest.type, fetchStudentList);

  yield debounce(500, setFilterWithDebounce.type, handlerSearchDebounce);

  yield takeLatest(deleteStudentRequest.type, deleteStudent);
}

export default function* studentSaga() {
  yield all([fork(watchGetRequest)]);
}
