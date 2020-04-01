import { BSON } from 'mongodb-stitch-browser-sdk';

export default ({ mongodbStitch }) => {
  const collection = mongodbStitch.db.collection('groups');
  return {
    myInvitations: {
      fetch() {
        return collection.find({
          owner: mongodbStitch.user.id,
        }, {
          limit: 100,
        }).asArray();
      },
    },
    myGroups: {
      fetch() {
        return collection.find({
          owner: mongodbStitch.user.id,
        }, {
          limit: 100,
        }).asArray();
      },
    },
    myGroup: {
      single: true,
      fetch({ _id }) {
        return collection.findOne({
          owner: mongodbStitch.user.id,
          _id: new BSON.ObjectId(_id),
        });
      },
    },
  };
};
