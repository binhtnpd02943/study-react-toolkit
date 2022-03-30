import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const apiCall = (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: Record<string, unknown>,
  headers: false | Record<string, unknown> = {} // headers = false khi không muốn dùng thông tin header tenant, org
): Promise<AxiosResponse<any>> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    headers: headers && { ...headers },
  };
  if (method === 'GET') {
    config.params = data;
  } else {
    config.data = data;
  }
  return axios(config).then((response) => {
    return response;
  });
};
export type CustomError = {
  code?: number;
  message?: string;
};

export const getCustomError = (err: any): CustomError => {
  const error: CustomError = {
    message: 'An unknown error occurred',
  };

  if (err.response && err.response.data && err.response.data.error && err.response.data.message) {
    error.code = err.response.data.error;
    error.message = err.response.data.message;
  } else if (!err.response && err.message) {
    error.message = err.message;
  }

  return error;
};
