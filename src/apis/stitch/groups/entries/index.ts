import { BSON } from 'mongodb-stitch-browser-sdk';
import mongodbStitch from '@/services/mongodbStitch';
import { getGroupId } from '../helpers';
import invitations from './invitations';

const collection = mongodbStitch.db.collection('groups');

export default ({ itemToKey }) => ({
  ...invitations({ itemToKey }),
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
});
