import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    token: null,
    loginUserName: '',
  },
  getters: {
    token: state => state.token,
    loginUserName: state => state.loginUserName,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setloginUserName(state, payload) {
      state.loginUserName = payload;
    }
  },
  actions: {}
};
