import Vue from 'vue';
import Vuex from 'vuex';
import userService from '@/services/user';

Vue.use(Vuex);

export default {
  state: {
    token: null,
    loginUserName: '',
    loginUserId : '',
    randomUsers: [],
    followText: [],
  },
  getters: {
    token: state => state.token,
    loginUserName: state => state.loginUserName,
    loginUserId: state => state.loginUserId,
    randomUsers: state => state.randomUsers,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setloginUserName(state, payload) {
      state.loginUserName = payload;
    },
    setLoginUserId(state, payload) {
      state.loginUserId = payload;
    },
    setRandomUsers(state, payload) {
      state.randomUsers = payload;
    },
    changeUserText(state, payload) {
      state.randomUsers.find(x => x._id === payload._id).text = payload.text;
    }
  },
  actions: {
    async getRandomUsers({ commit, state }) {
      const res = await userService.getRandomUsers({
        fromUserId: state.loginUserId
      });
      res.users.map(x => {
        x.text = 'Follow';
      });
      commit('setRandomUsers', res.users);
    }
  }
};
