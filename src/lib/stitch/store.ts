import mongoDbStitch from '@/plugins/mongoDbStitch';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    user: (state) => state.user,
  },
  actions: {
    async tryAuth({ commit }) {
      const user = mongoDbStitch.tryAuth();
      commit('setUser', user);
      return user;
    },
    async loginWithEmailAndPassword({ commit }, { email, password }) {
      const user = await mongoDbStitch.loginWithEmailAndPassword(email, password);
      commit('setUser', user);
      return user;
    },
    registerWithEmail(email, password) {
      return mongoDbStitch.registerWithEmail(email, password);
    },
    sendResetPasswordEmail(_, { email }) {
      return mongoDbStitch.sendResetPasswordEmail(email);
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
};
