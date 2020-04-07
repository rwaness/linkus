import { BSON } from 'mongodb-stitch-browser-sdk';
import mongodbStitch from '@/services/mongodbStitch';

export const getUserId = ({ _id: id } = {}, toString = true) => (id
  ? ((toString && `${id}`) || id)
  : null
);

export const formatUser = (user) => ({
  ...user,
  id: getUserId(user),
});

export const usersApiFactory = () => {
  const collection = mongodbStitch.db.collection('users');

  return {
    profile: {
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
    userDetail: {
      single: true,
      doQuery({ id }) {
        return collection.findOne({ _id: new BSON.ObjectId(id) });
      },
    },
  };
};
