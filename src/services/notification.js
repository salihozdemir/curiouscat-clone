import api from './index';

export default {
  async createNotification(payload) {
    try {
      const res = await api().post('/notification/create', payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  async deleteNotification(payload) {
    try {
      const res = await api().delete('/notification/delete', payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  async getNotifications(payload) {
    try {
      const res = await api().post('/notification/get', payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
}