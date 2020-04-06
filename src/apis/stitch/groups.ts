import { BSON } from 'mongodb-stitch-browser-sdk';
import mongodbStitch from '@/services/mongodbStitch';

export const getGroupId = ({ _id: id } = {}, toString = true) => (id
  ? ((toString && `${id}`) || id)
  : null
);

export const formatGroup = (group) => ({
  ...group,
  id: getGroupId(group),
});

export const groupsApiFactory = ({ itemToKey }) => {
  const collection = mongodbStitch.db.collection('groups');

  return {
    myInvitations: {
      doQuery() {
        return collection.find({
          guests: mongodbStitch.user.profile.email,
        }, {
          limit: 100,
        }).asArray();
      },
    },
    acceptInvitation: {
      single: true,
      async doQuery({ group }, { commit }) {
        const guest = mongodbStitch.user.profile.email;
        const joinedGroup = await collection.findOneAndUpdate({
          _id: getGroupId(group, false),
          guests: guest,
          'invitations.guest': guest,
          memberIds: { $nin: [mongodbStitch.user.id] },
        }, {
          $pull: {
            guests: guest,
            invitations: { guest },
          },
          $addToSet: {
            memberIds: mongodbStitch.user.id,
            members: {
              id: mongodbStitch.user.id,
              owner: 'invitations.$.owner',
            },
          },
        }, {
          returnNewDocument: true,
        });
        if (joinedGroup) {
          commit('myInvitations/removeKey', { key: itemToKey(joinedGroup) });
          commit('groupsList/addKey', { key: itemToKey(joinedGroup) });
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
        const guest = mongodbStitch.user.profile.email;
        const rejectedGroup = await collection.findOneAndUpdate({
          _id: getGroupId(group, false),
          guests: guest,
          'invitations.guest': guest,
          memberIds: { $nin: [mongodbStitch.user.id] },
        }, {
          $pull: {
            guests: guest,
            invitations: { guest },
          },
        }, {
          returnNewDocument: true,
        });
        if (rejectedGroup) {
          commit('myInvitations/removeKey', { key: itemToKey(rejectedGroup) });
        } else {
          // TODO
          alert('no group updated!');
        }
        return rejectedGroup;
      },
    },
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
        const owner = mongodbStitch.user.id;
        const newGroup = {
          owner,
          name,
          guests,
          invitations: guests.map((guest) => ({
            guest,
            owner,
          })),
          memberIds: [owner],
          members: [{
            id: owner,
          }],
        };
        const { insertedId } = await collection.insertOne(newGroup);
        return {
          _id: insertedId,
          ...newGroup,
        };
      },
    },
    groupDetail: {
      single: true,
      async doQuery({ id }, { getters }) {
        let groupDetail = getters.$item(id);
        if (getGroupId(groupDetail) !== id) {
          groupDetail = await collection.findOne({ _id: new BSON.ObjectId(id) });
        }
        return groupDetail;
      },
    },
  };
};
