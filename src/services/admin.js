import api from './index';

export default {
  async createQuestion(payload) {
    try {
      const res = await api().post('/admin/createQuestion', payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  async followToUser(payload) {
    try {
      const res = await api().post('/admin/followToUser', payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  },
  async userFollowAdmin(payload) {
    try {
      const res = await api().post('/admin/userFollowAdmin', payload);
      return res.data
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}