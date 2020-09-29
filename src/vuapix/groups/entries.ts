import * as api from '@/apis/stitch/groups';

/* eslint-disable no-underscore-dangle */

export const groupsList = {
  cache: 60 * 60, // 1h
  doQuery() {
    return api.groupsList();
  },
};

export const newGroup = {
  single: true,
  doQuery({ name, guests }) {
    return api.newGroup({ name, guests });
  },
};

export const invite = {
  single: true,
  doQuery({ group, guests }) {
    return api.invite({ group, guests });
  },
};

export const invitationsList = {
  doQuery() {
    return api.invitationsList();
  },
};

export const acceptInvitation = {
  single: true,
  async doQuery({ group }, { $store, itemToUid }) {
    const { commit } = $store;
    const joinedGroup = await api.acceptInvitation({ group });

    if (!joinedGroup) {
      throw new Error('No group updated');
    }

    const uId = itemToUid(joinedGroup);
    commit('invitationsList/removeUid', { uId });
    commit('groupsList/addUid', { uId });

    return joinedGroup;
  },
};

export const rejectInvitation = {
  single: true,
  async doQuery({ group }, { $store, itemToUid }) {
    const { commit } = $store;
    const rejectedGroup = await api.rejectInvitation({ group });

    if (!rejectedGroup) {
      throw new Error('No group updated');
    }

    const uId = itemToUid(rejectedGroup);
    commit('invitationsList/removeUid', { uId });

    return rejectedGroup;
  },
};

export const groupDetail = {
  single: true,
  async doQuery({ id }, { $store }) {
    const { getters } = $store;
    let group = getters._item(id);

    if (!group) {
      group = await api.groupDetail({ id });
    }

    return group;
  },
};
