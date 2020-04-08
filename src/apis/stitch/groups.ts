import { BSON } from 'mongodb-stitch-browser-sdk';
import mongodbStitch from '@/services/mongodbStitch';

export const getGroupId = ({ _id: id } = {}, toString = true) => (id
  ? ((toString && `${id}`) || id)
  : null
);

export const formatGuest = (guest, group) => {
  const invitedBy = (typeof guest.invitedBy === 'string')
    ? group.members.find(({ id }) => guest.invitedBy === id)
    : guest.invitedBy;
  return {
    ...guest,
    invitedBy: invitedBy || {},
  };
};

export const formatMember = (member, group) => (group.guests.includes(member.email)
  ? formatGuest(member, group)
  : member);

export const formatGroup = (group) => ({
  ...group,
  id: getGroupId(group),
  plugins: [],
  members: (group.members || []).map((member) => formatMember(member, group)),
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
        const guest = mongodbStitch.user;
        const joinedGroup = await collection.findOneAndUpdate({
          _id: getGroupId(group, false),
          guests: guest.profile.email,
          memberIds: { $nin: [guest.id] },
        }, {
          $pull: {
            guests: guest.profile.email,
          },
          $addToSet: {
            memberIds: guest.id,
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
        const guest = mongodbStitch.user;
        const rejectedGroup = await collection.findOneAndUpdate({
          _id: getGroupId(group, false),
          guests: guest.profile.email,
          memberIds: { $nin: [guest.id] },
        }, {
          $pull: {
            guests: guest.profile.email,
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
        const owner = mongodbStitch.user.customData;
        const newGroup = {
          owner: owner.id,
          name,
          guests,
          memberIds: [owner.id],
          members: [{
            id: owner.id,
            ...owner.profile,
          }, ...guests.map((guest) => ({
            email: guest,
            invitedBy: owner.id,
          }))],
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
