import { all, call, fork, put, takeLatest } from '@redux-saga/core/effects';
import { Action } from '../../fe-helper/core/store/types';
import { getCustomError } from '../../shared/contants/aloApi';
import cityApi from '../../shared/contants/cityApi';
import { City, ListResponse } from '../../shared/model';
import { fetchCityListFailed, fetchCityListRequest, fetchCityListSuccess } from './action';

function* fetchCityList(action: Action) {
  try {
    if (fetchCityListRequest.match(action)) {
      const response: ListResponse<City> = yield call(cityApi.getAll);
      yield put(fetchCityListSuccess(response));
    }
  } catch (error) {
    yield put(fetchCityListFailed(getCustomError(error)));
  }
}

function* watchGetRequest() {
  yield takeLatest(fetchCityListRequest.type, fetchCityList);
}

export default function* citySaga() {
  yield all([fork(watchGetRequest)]);
}
