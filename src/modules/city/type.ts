import { City, PaginationParams } from '../../shared/model';

export interface CityState {
  loading: boolean;
  list: City[];
  pagination: PaginationParams;
}

export enum CityType {
  FETCH_CITY_LIST_REQUEST = '@CITY/FETCH_CITY_LIST_REQUEST',
  FETCH_CITY_LIST_REQUEST_SUCCESS = '@CITY/FETCH_CITY_LIST_REQUEST_SUCCESS',
  FETCH_CITY_LIST_REQUEST_FAILED = '@CITY/FETCH_CITY_LIST_REQUEST_FAILED',
}
