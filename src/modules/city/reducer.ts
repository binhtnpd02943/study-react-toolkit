import { createReducer, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { ApplicationState } from '../../fe-helper/core/store/types';
import { Builder } from '../../shared/helper/builder.helper';
import { City, ListResponse } from '../../shared/model';
import { fetchCityListFailed, fetchCityListRequest, fetchCityListSuccess } from './action';
import { CityState } from './type';

export const cityState = Builder<CityState>()
  .loading(false)
  .list([])
  .pagination({
    _page: 1,
    _limit: 10,
    _totalRows: 10,
  })
  .build();

export const cityReducer = createReducer(cityState, (builder) => {
  return builder
    .addCase(fetchCityListRequest, (state) => {
      state.loading = true;
    })
    .addCase(fetchCityListSuccess, (state, action: PayloadAction<ListResponse<City>>) => {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination
    })
    .addCase(fetchCityListFailed, (state) => {
      state.loading = false;
    });
});

//Selectors
export const selectCityList = (state: ApplicationState) => state.city.list;

export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;
    return map;
  }, {})
);

export const selectCityOptions = createSelector(selectCityList, (cityList) =>
  cityList.map((city) => ({
    label: city.name,
    value: city.code,
  }))
);

export default cityReducer;
export { cityState as cityInitialState };
