import * as api from '@/apis/stitch/apps';
import * as userApi from '@/apis/stitch/users';

export default ({ itemToKey }) => ({
  appsList: {
    doQuery() {
      return api.appsList();
    },
  },

  appDetail: {
    single: true,
    doQuery({ id }) {
      return api.appDetail({ id });
    },
  },

  userAppsList: {
    doQuery(user) {
      return api.appsList({ ids: user.apps });
    },
  },

  userAddApp: {
    single: true,
    doQuery({ id }, { getters, commit }) {
      const updatedUser = userApi.addApp({ id });

      if (!updatedUser) {
        throw new Error('No user updated');
      }

      commit('vuapix/users/setItems', {
        [itemToKey(updatedUser)]: updatedUser,
      }, { root: true });

      return getters.$item(id);
    },
  },
});
