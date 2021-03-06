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
  async uploadProfilePhoto(payload) {
    try {
      const res = await api().post('/user/profileImg', payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  async getRandomUsers(payload) {
    try {
      const res = await api().post('/user/getRandomUser', payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  },
  async searchUsers(payload) {
    try {
      const res = await api().post('/user/searchUser', payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
};