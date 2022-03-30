// @flow

import { all } from 'typed-redux-saga';
import authSaga from '../modules/auth/authSaga';
import citySaga from '../modules/city/saga';
import dashboardSaga from '../modules/dashboard/saga';
import studentFormSaga from '../modules/student/screen/form/saga';
import studentSaga from '../modules/student/screen/list/saga';

export default function* saga(): Generator {
  yield all([authSaga(), dashboardSaga(), studentSaga(), studentFormSaga(), citySaga()]);
}
