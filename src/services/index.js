import axios from 'axios';
import common from '@/common/index';

const instance = axios.create();

instance.interceptors.request.use(config => {
  const token = common.cookie.get('access_token');
  config.baseURL = process.env.VUE_APP_API_URL + '/api';
  config.headers.authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  res => res,
  err => err
);
export default () => instance;
