import { createAction } from "@reduxjs/toolkit";
import { CustomError } from "../../shared/contants/aloApi";
import { City, ListResponse } from "../../shared/model";
import { CityType } from "./type";


export const fetchCityListRequest = createAction<undefined>(
    CityType.FETCH_CITY_LIST_REQUEST
);

export const fetchCityListSuccess = createAction<ListResponse<City>>(
    CityType.FETCH_CITY_LIST_REQUEST_SUCCESS
);

export const fetchCityListFailed = createAction<CustomError>(
    CityType.FETCH_CITY_LIST_REQUEST_FAILED
);