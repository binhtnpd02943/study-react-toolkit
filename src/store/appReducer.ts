import { connectRouter } from 'connected-react-router';
import authReducer, { authInitialState } from '../modules/auth/reducer';
import cityReducer, { cityInitialState } from '../modules/city/reducer';
import dashboardReducer, { dashboardInitialState } from '../modules/dashboard/reducer';
import studentFormReducer, { studentEditInitialState } from '../modules/student/screen/form/reducer';
import studentReducer, { studentInitialState } from '../modules/student/screen/list/reducer';
import { history } from '../shared/helper/history';
import AppState from '../store/types';

export const AppInitialState: AppState = {
  auth: authInitialState,
  dashboard:dashboardInitialState,
  student: studentInitialState,
  city: cityInitialState,
  studentForm: studentEditInitialState
};

const AppReducer = {
  router: connectRouter(history),
  auth: authReducer,
  dashboard: dashboardReducer,
  student: studentReducer,
  city: cityReducer,
  studentForm: studentFormReducer

};

export default AppReducer;
