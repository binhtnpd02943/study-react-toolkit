import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Builder } from '../../shared/helper/builder.helper';
import { Student } from '../../shared/model';
import {
  fetchDataDashboard,
  fetchDataFailedDashboard,
  fetchDataSuccessDashboard,
  setHighestStudentList,
  setLowestStudentList,
  setRankingByCityList,
  setStatistics,
} from './action';
import { DashboardState, DashboardStatistics, RankingByCity } from './type';

export const dashboardSate = Builder<DashboardState>()
  .loading(false)
  .statistics({
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  })
  .highestStudentList([])
  .lowestStudentList([])
  .rankingByCityList([])
  .build();

export const dashboardReducer = createReducer(dashboardSate, (builder) => {
  return builder
    .addCase(fetchDataDashboard, (state) => {
      state.loading = true;
    })
    .addCase(fetchDataSuccessDashboard, (state) => {
      state.loading = false;
    })
    .addCase(fetchDataFailedDashboard, (state) => {
      state.loading = false;
    })
    .addCase(setStatistics, (state, action: PayloadAction<DashboardStatistics>) => {
      state.statistics = action.payload;
    })
    .addCase(setHighestStudentList, (state, action: PayloadAction<Student[]>) => {
      state.highestStudentList = action.payload;
    })
    .addCase(setLowestStudentList, (state, action: PayloadAction<Student[]>) => {
      state.lowestStudentList = action.payload;
    })
    .addCase(setRankingByCityList, (state, action: PayloadAction<RankingByCity[]>) => {
      state.rankingByCityList = action.payload;
    });
});

export default dashboardReducer;
export {dashboardSate as dashboardInitialState}
