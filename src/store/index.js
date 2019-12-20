import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';

const getters = {
  // eslint-disable-next-line no-shadow
  currentUser: state => state.user,
};

const actions = {
  logIn({ commit }, user) {
    commit('setUser', user);
  },
  logOut({ commit }) {
    const user = { id: '', name: '', type: 0 };
    commit('setUser', user);
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow,no-return-assign
  setUser: (state, user) => state.user = user,
};

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
