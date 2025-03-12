import axios, { AxiosRequestConfig } from 'axios';

function getAxiosInstance() {
  return {
    get(endpoint: string, baseURL: string, params: any, options?: AxiosRequestConfig) {
      return axios.get(`${endpoint}`, {
        baseURL,
        params,
        ...options
      });
    },
    post(endpoint: string, baseURL: string, data: any, options?: AxiosRequestConfig) {
      return axios.post(`${endpoint}`, data, {
        baseURL: baseURL,
        ...options
      });
    },
  };
}

const AxiosInstance = getAxiosInstance();

export default AxiosInstance;
