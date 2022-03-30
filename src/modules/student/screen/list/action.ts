import { createAction } from '@reduxjs/toolkit';
import { CustomError } from '../../../../shared/contants/aloApi';
import { ListParams, ListResponse, Student } from '../../../../shared/model';
import { studentDeleteParam, StudentType } from './type';

export const fetchStudentListRequest = createAction<ListParams>(
  StudentType.FETCH_STUDENT_LIST_REQUEST
);

export const fetchStudentListSuccess = createAction<ListResponse<Student>>(
  StudentType.FETCH_STUDENT_LIST_SUCCESS
);

export const fetchStudentListFailed = createAction<CustomError>(
  StudentType.FETCH_STUDENT_LIST_FAILED
);

export const setFilter = createAction<ListParams>(
  StudentType.SET_FILTER
);

export const setFilterWithDebounce = createAction<ListParams>(
    StudentType.SET_FILTER_WITH_DEBOUNCE
);

export const deleteStudentRequest = createAction<studentDeleteParam>(
  StudentType.DELETE_STUDENT_REQUEST
);

export const deleteStudentSuccess = createAction<ListResponse<Student>>(
  StudentType.DELETE_STUDENT_SUCCESS
);

export const deleteStudentFailed = createAction<CustomError>(
  StudentType.DELETE_STUDENT_FAILED
);
