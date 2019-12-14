import axios from 'axios';
import common from '@/common/index';

const instance = axios.create();

instance.interceptors.request.use(config => {
  const token = common.cookie.get('access_token');
  config.baseURL = 'https://question-node-api.herokuapp.com';
  config.headers.authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  res => res,
  err => err
);
export default () => instance;
