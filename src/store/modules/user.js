import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    token: null,
    loginUserName: '',
    loginUserId : '',
  },
  getters: {
    token: state => state.token,
    loginUserName: state => state.loginUserName,
    loginUserId: state => state.loginUserId,
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
    }
  },
  actions: {}
};
