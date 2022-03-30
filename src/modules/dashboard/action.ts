import { createAction } from "@reduxjs/toolkit";
import { CustomError } from "../../shared/contants/aloApi";
import { Student } from "../../shared/model";
import { DashboardStatistics, DashboardType, RankingByCity } from "./type";



export const fetchDataDashboard = createAction<undefined>(
    DashboardType.FETCH_DATA_REQUEST
);

export const fetchDataSuccessDashboard = createAction<undefined>(
    DashboardType.FETCH_DATA_SUCCESS
);

export const fetchDataFailedDashboard = createAction<CustomError>(
    DashboardType.FETCH_DATA_FAILED
);

export const setStatistics = createAction<DashboardStatistics>(
    DashboardType.SET_STATISTICS
);

export const setHighestStudentList = createAction<Student[]>(
    DashboardType.SET_HIGHEST_STUDENT_LIST
);

export const setLowestStudentList = createAction<Student[]>(
    DashboardType.SET_LOWEST_STUDENT_LIST
);

export const setRankingByCityList = createAction<RankingByCity[]>(
    DashboardType.SET_RANKING_CITY_LIST
);