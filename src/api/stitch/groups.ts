import { BSON } from 'mongodb-stitch-browser-sdk';

export const itemToKey = ({ _id: id } = {}) => (id ? `${id}` : null);

export const createApi = ({ mongodbStitch }) => {
  const collection = mongodbStitch.db.collection('groups');
  return {
    myInvitations: {
      doQuery() {
        return collection.find({
          owner: mongodbStitch.user.id,
        }, {
          limit: 100,
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
      async doQuery({ name, emails }) {
        const newGroup = {
          owner: mongodbStitch.user.id,
          name,
          emails,
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
        if (itemToKey(myGroup) !== id) {
          myGroup = await collection.findOne({
            owner: mongodbStitch.user.id,
            _id: new BSON.ObjectId(id),
          });
        }
        return myGroup;
      },
    },
  };
};
