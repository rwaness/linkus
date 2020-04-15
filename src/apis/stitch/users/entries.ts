import { BSON } from 'mongodb-stitch-browser-sdk';
import mongodbStitch from '@/services/mongodbStitchService';
import {
  getUserId,
} from './helpers';

const collection = mongodbStitch.db.collection('users');

export default () => ({
  userDetail: {
    single: true,
    doQuery({ id }) {
      return collection.findOne({ _id: new BSON.ObjectId(id) });
    },
  },
  updateProfile: {
    single: true,
    async doQuery(profile) {
      const user = await collection.findOneAndUpdate({
        id: getUserId(mongodbStitch.user.customData),
      }, {
        $set: Object.keys(profile).reduce((newProfile, field) => ({
          ...newProfile,
          [`profile.${field}`]: profile[field],
        }), {}),
      }, {
        returnNewDocument: true,
      });
      if (user) {
        await mongodbStitch.refreshCustomData();
      }
      return user;
    },
  },
  flagAsOnBoarded: {
    single: true,
    async doQuery() {
      const user = await collection.findOneAndUpdate({
        id: getUserId(mongodbStitch.user.customData),
      }, {
        $set: {
          onBoarded: true,
        },
      }, {
        returnNewDocument: true,
      });
      if (user) {
        await mongodbStitch.refreshCustomData();
      }
      return user;
    },
  },
});
