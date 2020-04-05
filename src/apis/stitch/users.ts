import { BSON } from 'mongodb-stitch-browser-sdk';
import mongodbStitch from '@/services/mongodbStitch';

export const getUserId = ({ _id: id } = {}, toString = true) => (id
  ? ((toString && `${id}`) || id)
  : null
);

export const usersApiFactory = () => {
  const collection = mongodbStitch.db.collection('users');

  return {
    userDetail: {
      single: true,
      doQuery({ id }) {
        return collection.findOne({ _id: new BSON.ObjectId(id) });
      },
    },
  };
};
