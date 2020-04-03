import { BSON } from 'mongodb-stitch-browser-sdk';
import mongodbStitch from '@/services/mongodbStitch';

const collection = mongodbStitch.db.collection('groups');

export const groupIdToString = ({ _id: id } = {}) => (id ? `${id}` : null);

export const groupsApi = {
  myInvitations: {
    doQuery() {
      return collection.find({
        guests: mongodbStitch.user.profile.email,
      }, {
        limit: 99,
      }).asArray();
    },
  },
  myGroups: {
    doQuery() {
      return collection.find({
        owner: mongodbStitch.user.id,
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
      };
      const { insertedId } = await collection.insertOne(newGroup);
      return {
        _id: insertedId,
        ...newGroup,
      };
    },
  },
  myGroup: {
    single: true,
    async doQuery({ id }, { getters }) {
      let myGroup = getters.$item(id);
      if (groupIdToString(myGroup) !== id) {
        myGroup = await collection.findOne({
          owner: mongodbStitch.user.id,
          _id: new BSON.ObjectId(id),
        });
      }
      return myGroup;
    },
  },
};
