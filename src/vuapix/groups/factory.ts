import * as api from '@/apis/stitch/groups';

export default ({ itemToKey }) => ({
  groupsList: {
    doQuery() {
      return api.groupsList();
    },
  },

  newGroup: {
    single: true,
    doQuery({ name, guests }) {
      return api.newGroup({ name, guests });
    },
  },

  invite: {
    single: true,
    doQuery({ group, guests }) {
      return api.invite({ group, guests });
    },
  },

  invitationsList: {
    doQuery() {
      return api.invitationsList();
    },
  },

  acceptInvitation: {
    single: true,
    async doQuery({ group }, { commit }) {
      const joinedGroup = await api.acceptInvitation({ group });

      if (!joinedGroup) {
        throw new Error('No group updated');
      }

      const key = itemToKey(joinedGroup);
      commit('invitationsList/removeKey', { key });
      commit('groupsList/addKey', { key });

      return joinedGroup;
    },
  },

  rejectInvitation: {
    single: true,
    async doQuery({ group }, { commit }) {
      const rejectedGroup = await api.rejectInvitation({ group });

      if (!rejectedGroup) {
        throw new Error('No group updated');
      }

      const key = itemToKey(rejectedGroup);
      commit('invitationsList/removeKey', { key });

      return rejectedGroup;
    },
  },

  groupDetail: {
    single: true,
    async doQuery({ id }, { getters }) {
      let groupDetail = getters.$item(id);

      if (!groupDetail) {
        groupDetail = await api.groupDetail({ id });
      }

      return groupDetail;
    },
  },
});
