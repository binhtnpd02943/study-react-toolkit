import { ListParams, PaginationParams, Student } from '../../../../shared/model';

export interface StudentState {
  loading: boolean;
  response: any;
  error: string;
  list: Student[];
  filter: ListParams;
  pagination: PaginationParams;
}

export interface studentDeleteParam {
    id: string;
    param?: any;
  }

export enum StudentType {
  FETCH_STUDENT_LIST_REQUEST = '@@STUDENT/FETCH_STUDENT_LIST_REQUEST',
  FETCH_STUDENT_LIST_SUCCESS = '@@STUDENT/FETCH_STUDENT_LIST_SUCCESS',
  FETCH_STUDENT_LIST_FAILED = '@@STUDENT/FETCH_STUDENT_LIST_FAILED',

  SET_FILTER = '@@STUDENT/SET_FILTER',

  SET_FILTER_WITH_DEBOUNCE = '@@STUDENT/SET_FILTER_WITH_DEBOUNCE',

  DELETE_STUDENT_REQUEST = '@@STUDENT/DELETE_STUDENT_REQUEST',
  DELETE_STUDENT_SUCCESS = '@@STUDENT/DELETE_STUDENT_SUCCESS',
  DELETE_STUDENT_FAILED = '@@STUDENT/DELETE_STUDENT_FAILED',
}
