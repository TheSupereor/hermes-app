import axios from 'axios';

function getAxiosInstance() {
  return {
    get(endpoint: string, baseURL: string, params: any) {
      return axios.get(`/${endpoint}`, {
        baseURL,
        params,
      });
    },
		post(endpoint: string, baseURL: string, data: any) {
			return axios.post(`${endpoint}`,{
				baseURL,
				data
			});
		}
  };
}

const AxiosInstance = getAxiosInstance()

export default AxiosInstance;