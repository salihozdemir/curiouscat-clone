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
    }
  },
  actions: {
    async getRandomUsers({ commit, state }) {
      const res = await userService.getRandomUsers({
        fromUserId: state.loginUserId
      });
      commit('setRandomUsers', res.users);
    }
  }
};
