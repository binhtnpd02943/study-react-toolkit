import { all, call, fork, put, takeLatest } from '@redux-saga/core/effects';
import { getCustomError } from '../../shared/contants/aloApi';
import cityApi from '../../shared/contants/cityApi';
import studentApi from '../../shared/contants/studentApi';
import { City, ListResponse, Student } from '../../shared/model';
import {
  fetchDataDashboard,
  fetchDataFailedDashboard,
  fetchDataSuccessDashboard,
  setHighestStudentList,
  setLowestStudentList,
  setRankingByCityList,
  setStatistics,
} from './action';
import { RankingByCity } from './type';

function* fetchStatistics() {
  const response: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);

  const statisticList = response.map((x) => x.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticList;

  yield put(setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount }));
}

function* fetchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });

  yield put(setHighestStudentList(data));
}

function* fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });

  yield put(setLowestStudentList(data));
}

function* fetchRankingCityList() {
  //Fetch city list
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);

  //Fetch ranking per city
  const callList = cityList.map((x) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'desc',
      city: x.code,
    })
  );

  const response: Array<ListResponse<Student>> = yield all(callList);
  const rankingByCityList: Array<RankingByCity> = response.map((x, index) => ({
    cityId: cityList[index].code,
    cityName: cityList[index].name,
    rankingList: x.data,
  }));

  //Update static
  yield put(setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingCityList),
    ]);
    yield put(fetchDataSuccessDashboard());
  } catch (error) {
    yield put(fetchDataFailedDashboard(getCustomError(error)));
  }
}

function* watchGetRequest() {
  yield takeLatest(fetchDataDashboard.type, fetchDashboardData);
}

export default function* dashboardSaga() {
  yield all([fork(watchGetRequest)]);
}
