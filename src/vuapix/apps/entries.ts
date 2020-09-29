import * as api from '@/apis/stitch/apps';
import * as userApi from '@/apis/stitch/users';

/* eslint-disable no-underscore-dangle */

export const appsList = {
  doQuery({ user }) {
    // { ids: user.apps }
    return api.appsList();
  },
};

export const appDetail = {
  single: true,
  doQuery({ id }) {
    return api.appDetail({ id });
  },
};

export const userAddApp = {
  single: true,
  doQuery({ id }, { $store, itemToUid }) {
    const { getters, commit } = $store;
    const updatedUser = userApi.addApp({ id });

    if (!updatedUser) {
      throw new Error('No user updated');
    }

    commit('vuapix/users/setItems', {
      [itemToUid(updatedUser)]: updatedUser,
    }, { root: true });

    return getters._item(id);
  },
};
