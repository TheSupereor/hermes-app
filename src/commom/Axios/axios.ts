import axios from 'axios';

const TelegramBaseURL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
function getAxiosInstance() {
  return {
    get(method: string, params: any) {
      return axios.get(`/${method}`, {
        baseURL: TelegramBaseURL,
        params,
      });
    },
		post(method: string, data: any) {
			return axios({
				method: 'post',
				baseURL: TelegramBaseURL,
				url: `${method}`,
				data
			});
		}
  };
}

const AxiosInstance = getAxiosInstance()

export default AxiosInstance;