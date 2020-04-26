import api from './index';

export default {
  async followOrUnFollow(payload) {
    try {
      const res = await api().post('/follow', payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  async isFollow(payload) {
    try {
      const res = await api().post('/follow/isFollow', payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  async getUserFollowers(payload) {
    try {
      const res = await api().get('/follow/getUserFollowers/' + payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  async getUserFollowings(payload) {
    try {
      const res = await api().get('/follow/getUserFollowing/' + payload);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
}