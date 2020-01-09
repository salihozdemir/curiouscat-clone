import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    activeComponent: 'signup'
  },
  getters: {
    getActiveComponent(state) {
      return state.activeComponent;
    }
  },
  mutations: {
    setActiveComponent(state, payload) {
      state.activeComponent = payload;
    }
  },
  actions: {}
};
