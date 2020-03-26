export default (mongodbStitch) => ({
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    user: (state) => state.user,
  },
  actions: {
    async auth({ commit }) {
      const user = mongodbStitch.auth();
      commit('setUser', user);
      return user;
    },
    async loginAnonymous({ commit }) {
      const user = await mongodbStitch.loginAnonymous();
      commit('setUser', user);
      return user;
    },
    async loginWithEmailAndPassword({ commit }, { email, password }) {
      const user = await mongodbStitch.loginWithEmailAndPassword(email, password);
      commit('setUser', user);
      return user;
    },
    registerWithEmail(_, { email, password }) {
      return mongodbStitch.registerWithEmail(email, password);
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
});
