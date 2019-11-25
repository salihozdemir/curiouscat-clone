import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    token: null
  },
  getters: {
    getToken(state) {
      return state.token;
    }
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    }
  },
  actions: {}
};
