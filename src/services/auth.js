import api from './index';
import common from '@/common/index';

export default {
  async signUp(payload) {
    const res = await api().post('/user/signup', payload);
    if(res.data) common.cookie.set('access_token', res.data.token, 1);
    return res;
  },
  async logIn(payload) {
    const res = await api().post('/user/login', payload);
    if(res.data) common.cookie.set('access_token', res.data.token, 1);
    return res;
  },
}