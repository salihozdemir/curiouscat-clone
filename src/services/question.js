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
  async getUserQuestions(payload) {
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
  async answerQuestion(payload) {
    try {
      const res = await api().patch('/question', payload);
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
      const res = await api().post('/question/getFollowingQuestions', payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  },
  async getRandomQuestions(payload) {
    try {
      const res = await api().post('/question/randomQuestions', payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  }
}