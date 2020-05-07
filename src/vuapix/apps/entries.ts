import * as api from '@/apis/stitch/apps';
import * as userApi from '@/apis/stitch/users';

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
  doQuery({ id }, { vuapixCtx, storeCtx }) {
    const { getters, commit } = storeCtx;
    const { itemToKey } = vuapixCtx;
    const updatedUser = userApi.addApp({ id });

    if (!updatedUser) {
      throw new Error('No user updated');
    }

    commit('vuapix/users/setItems', {
      [itemToKey(updatedUser)]: updatedUser,
    }, { root: true });

    return getters.$item(id);
  },
};
