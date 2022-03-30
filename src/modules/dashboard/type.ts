import { Student } from '../../shared/model';

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}

export interface RankingByCity {
  cityId: string;
  cityName: string;
  rankingList: Student[];
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: RankingByCity[];
}

export enum DashboardType {
  FETCH_DATA_REQUEST = '@@DASHBOARD/FETCH_DATA_REQUEST',
  FETCH_DATA_SUCCESS = '@@DASHBOARD/FETCH_DATA_SUCCESS',
  FETCH_DATA_FAILED = '@@DASHBOARD/FETCH_DATA_FAILED',

  SET_STATISTICS = '@@DASHBOARD/SET_STATISTICS',
  SET_HIGHEST_STUDENT_LIST = '@@DASHBOARD/SET_HIGHEST_STUDENT_LIST',
  SET_LOWEST_STUDENT_LIST = '@@DASHBOARD/SET_LOWEST_STUDENT_LIST',
  SET_RANKING_CITY_LIST = '@@DASHBOARD/SET_RANKING_CITY_LIST',
}
