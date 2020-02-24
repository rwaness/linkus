export default function createStore(mongodbStitch) {
  return {
    namespaced: true,
    state: {
      user: null,
    },
    getters: {
      user: (state) => state.user,
    },
    actions: {
      async tryAuth({ commit }) {
        const user = mongodbStitch.tryAuth();
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
      sendResetPasswordEmail(_, { email }) {
        return mongodbStitch.sendResetPasswordEmail(email);
      },
    },
    mutations: {
      setUser(state, user) {
        state.user = user;
      },
    },
  };
}
