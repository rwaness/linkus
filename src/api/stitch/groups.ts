import { BSON } from 'mongodb-stitch-browser-sdk';

export default ({ mongodbStitch }) => {
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
      doQuery({ _id }) {
        return collection.findOne({
          owner: mongodbStitch.user.id,
          _id: new BSON.ObjectId(_id),
        });
      },
    },
  };
};
