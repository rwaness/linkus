import mongodbStitch from '@/services/mongodbStitchService';
import {
  getGroupId,
  getIdQuery,
  getGuestsUpdates,
  getInvitationsQuery,
  getInvitationQuery,
  getDeleteInvitationUpdates,
} from './helpers';

const collection = mongodbStitch.db.collection('groups');

export default ({ itemToKey }) => ({
  groupsList: {
    doQuery() {
      return collection.find({
        memberIds: mongodbStitch.user.id,
      }, {
        limit: 100,
      }).asArray();
    },
  },
  newGroup: {
    single: true,
    async doQuery({ name, guests }) {
      const owner = mongodbStitch.user.customData;
      const newGroup = {
        owner: owner.id,
        name,
        guests,
        memberIds: [owner.id],
        members: [
          {
            id: owner.id,
            ...owner.profile,
          },
          ...getGuestsUpdates(guests, owner),
        ],
      };
      const { insertedId } = await collection.insertOne(newGroup);
      return {
        _id: insertedId,
        ...newGroup,
      };
    },
  },
  invite: {
    single: true,
    doQuery({ group, guests }) {
      const owner = mongodbStitch.user.customData;
      return collection.findOneAndUpdate({
        ...getIdQuery(group.id),
      }, {
        $addToSet: {
          guests: { $each: guests },
          members: { $each: getGuestsUpdates(guests, owner) },
        },
      }, {
        returnNewDocument: true,
      });
    },
  },
  invitationsList: {
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
        commit('invitationsList/removeKey', { key });
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
        commit('invitationsList/removeKey', { key });
      } else {
        // TODO
        alert('no group updated!');
      }
      return rejectedGroup;
    },
  },
  groupDetail: {
    single: true,
    async doQuery({ id }, { getters }) {
      let groupDetail = getters.$item(id);
      if (getGroupId(groupDetail) !== id) {
        groupDetail = await collection.findOne(getIdQuery(id));
      }
      return groupDetail;
    },
  },
});
