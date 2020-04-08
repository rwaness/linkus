import mongodbStitch from '@/services/mongodbStitch';
import { getGroupId } from '../helpers';

const collection = mongodbStitch.db.collection('groups');

const getInvitationsQuery = () => ({
  guests: mongodbStitch.user.profile.email,
  memberIds: { $nin: [mongodbStitch.user.id] },
});

const getInvitationQuery = (group) => ({
  _id: getGroupId(group, false),
  ...getInvitationsQuery(),
});

const getDeleteInvitationUpdates = () => ({
  $pull: {
    guests: mongodbStitch.user.profile.email,
  },
});

export default ({ itemToKey }) => ({
  myInvitations: {
    doQuery() {
      return collection.find({
        ...getInvitationsQuery(),
      }).asArray();
    },
  },
  acceptInvitation: {
    single: true,
    async doQuery({ group }, { commit }) {
      const joinedGroup = await collection.findOneAndUpdate({
        ...getInvitationQuery(group),
      }, {
        ...getDeleteInvitationUpdates(),
        $addToSet: {
          memberIds: mongodbStitch.user.id,
        },
      }, {
        returnNewDocument: true,
      });
      if (joinedGroup) {
        const key = itemToKey(joinedGroup);
        commit('myInvitations/removeKey', { key });
        commit('groupsList/addKey', { key });
      } else {
        // TODO
        alert('no group updated!');
      }
      return joinedGroup;
    },
  },
  rejectInvitation: {
    single: true,
    async doQuery({ group }, { commit }) {
      const rejectedGroup = await collection.findOneAndUpdate({
        ...getInvitationQuery(group),
      }, {
        ...getDeleteInvitationUpdates(),
      }, {
        returnNewDocument: true,
      });
      if (rejectedGroup) {
        const key = itemToKey(rejectedGroup);
        commit('myInvitations/removeKey', { key });
      } else {
        // TODO
        alert('no group updated!');
      }
      return rejectedGroup;
    },
  },
});
