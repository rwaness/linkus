import { BSON } from 'mongodb-stitch-browser-sdk';
import mongodbStitch from '@/services/mongodbStitchService';
import { formatApp } from './formatters';

const collection = mongodbStitch.db.collection('apps');

export async function appsList() {
  return (await collection.find({}, {
    limit: 100,
  }).asArray()).map(formatApp);
}

export async function appDetail({ id }) {
  return formatApp(await collection.findOne({ _id: new BSON.ObjectId(id) }));
}
