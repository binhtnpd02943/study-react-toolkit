import { Student } from '../../../../shared/model';

export interface StudentFormState {
  isLoading: boolean;
  data: Student;
  response?: any;
  isLeave?: boolean;
  informationFormUpdateStudent: any
}

export interface StudentRequestParam {
  id: string;
}

export interface StudentResponse  {
  data: any;
};

export type SetIsLeave = {
    isLeave: boolean,
  }

export enum ActionTypes {
  SET_IS_LEAVE = '@@STUDENT_FORM/SET_IS_LEAVE',
  GET_STUDENT_DETAIL = '@@STUDENT_FORM/GET_STUDENT_DETAIL',
  GET_STUDENT_DETAIL_SUCCESS = '@@STUDENT_FORM/GET_STUDENT_DETAIL_SUCCESS',
  GET_STUDENT_DETAIL_FAILURE = '@@STUDENT_FORM/GET_STUDENT_DETAIL_FAILURE',

  ADD_STUDENT_REQUEST = '@@STUDENT_FORM/ADD_STUDENT_REQUEST',
  ADD_STUDENT_SUCCESS = '@@STUDENT_FORM/ADD_STUDENT_SUCCESS',
  ADD_STUDENT_FAILURE = '@@STUDENT_FORM/ADD_STUDENT_FAILURE',

  EDIT_STUDENT_REQUEST = '@@STUDENT_FORM/EDIT_STUDENT_REQUEST',
  EDIT_STUDENT_SUCCESS = '@@STUDENT_FORM/EDIT_STUDENT_SUCCESS',
  EDIT_STUDENT_FAILURE = '@@STUDENT_FORM/EDIT_STUDENT_FAILURE'

}
