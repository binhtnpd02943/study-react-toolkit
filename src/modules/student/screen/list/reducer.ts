import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationState } from '../../../../fe-helper/core/store/types';
import { CustomError } from '../../../../shared/contants/aloApi';
import { Builder } from '../../../../shared/helper/builder.helper';
import { ListParams, ListResponse, Student } from '../../../../shared/model';
import {
  deleteStudentFailed,
  deleteStudentRequest,
  deleteStudentSuccess,
  fetchStudentListFailed,
  fetchStudentListRequest,
  fetchStudentListSuccess,
  setFilter,
  setFilterWithDebounce,
} from './action';
import { studentDeleteParam, StudentState } from './type';

export const studentState = Builder<StudentState>()
  .loading(false)
  .response(null)
  .list([])
  .filter({
    _page: 1,
    _limit: 10,
  })
  .pagination({
    _page: 1,
    _limit: 10,
    _totalRows: 10,
  })
  .build();

export const studentReducer = createReducer(studentState, (builder) => {
  return builder
    .addCase(fetchStudentListRequest, (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    })
    .addCase(fetchStudentListSuccess, (state, action: PayloadAction<ListResponse<Student>>) => {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    })
    .addCase(fetchStudentListFailed, (state, action: PayloadAction<CustomError>) => {
      state.loading = false;
    })
    .addCase(setFilter, (state, action: PayloadAction<ListParams>) => {
      state.filter = action.payload;
    })

    .addCase(setFilterWithDebounce, (state, action: PayloadAction<ListParams>) => {})

    .addCase(deleteStudentRequest, (state, action: PayloadAction<studentDeleteParam>) => {
      state.loading = true;
    })
    .addCase(deleteStudentSuccess, (state, action) => {
      state.loading = false;
      state.response = action.payload;
    })
    .addCase(deleteStudentFailed, (state, action: PayloadAction<CustomError>) => {
      state.loading = false;
    });
});

//Selectors
export const selectStudentFilter = (state: ApplicationState) => state.student.filter;

export default studentReducer;
export { studentState as studentInitialState };
