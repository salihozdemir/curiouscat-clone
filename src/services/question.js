import api from './index';

export default {
  async createQuestion(payload) {
    try {
      const res = await api().post('/question', payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
}