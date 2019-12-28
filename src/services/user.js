import api from './index';

export default {
  async getUserDetail(payload) {
    try {
      const res = await api().get('/user/' + payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};