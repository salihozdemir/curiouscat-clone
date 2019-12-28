import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from "vuex-persistedstate";

import auth from './modules/auth';
import user from './modules/user';

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    auth,
    user
  }
});

export default store;
