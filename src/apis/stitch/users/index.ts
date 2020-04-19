import { BSON } from 'mongodb-stitch-browser-sdk';
import mongodbStitch, { getId } from '@/services/mongodbStitchService';

const collection = mongodbStitch.db.collection('users');

export function userDetail({ id }) {
  return collection.findOne({ _id: new BSON.ObjectId(id) });
}

export async function updateProfile({ profile, confidentiality }) {
  const user = await collection.findOneAndUpdate({
    id: getId(mongodbStitch.user.customData),
  }, {
    $set: {
      ...Object.keys(profile).reduce((newProfile, field) => ({
        ...newProfile,
        [`profile.${field}`]: profile[field],
      }), {}),
      ...Object.keys(confidentiality).reduce((newConfidentiality, field) => ({
        ...newConfidentiality,
        [`confidentiality.${field}`]: confidentiality[field],
      }), {}),
    },
  }, {
    returnNewDocument: true,
  });
  if (user) {
    await mongodbStitch.refreshCustomData();
  }
  return user;
}

export async function flagAsOnBoarded() {
  const user = await collection.findOneAndUpdate({
    id: getId(mongodbStitch.user.customData),
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
}
