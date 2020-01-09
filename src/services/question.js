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
  async getNonAnsweredQuestions(payload) {
    try {
      const res = await api().post('/question/getUserQuestion', payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  async answerQuestion(params, payload) {
    try {
      const res = await api().patch('/question/' + params , payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  async deleteQuestion(params, payload) {
    try {
      const res = await api().delete('/question/' + params, payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  async getFollowingQuestions(payload) {
    try {
      const res = await api().get('/question/getFollowingQuestions/' + payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  }
}