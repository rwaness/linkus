import * as api from '@/apis/stitch/groups';

export const groupsList = {
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
  async doQuery({ group }, { vuapixCtx, storeCtx }) {
    const { commit } = storeCtx;
    const { itemToKey } = vuapixCtx;
    const joinedGroup = await api.acceptInvitation({ group });

    if (!joinedGroup) {
      throw new Error('No group updated');
    }

    const key = itemToKey(joinedGroup);
    commit('invitationsList/removeKey', { key });
    commit('groupsList/addKey', { key });

    return joinedGroup;
  },
};

export const rejectInvitation = {
  single: true,
  async doQuery({ group }, { vuapixCtx, storeCtx }) {
    const { commit } = storeCtx;
    const rejectedGroup = await api.rejectInvitation({ group });

    if (!rejectedGroup) {
      throw new Error('No group updated');
    }

    const { itemToKey } = vuapixCtx;
    const key = itemToKey(rejectedGroup);
    commit('invitationsList/removeKey', { key });

    return rejectedGroup;
  },
};

export const groupDetail = {
  single: true,
  async doQuery({ id }, { storeCtx }) {
    const { getters } = storeCtx;
    let group = getters.$item(id);

    if (!group) {
      group = await api.groupDetail({ id });
    }

    return group;
  },
};
