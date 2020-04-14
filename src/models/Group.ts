import { BSON } from 'mongodb-stitch-browser-sdk';
import Member from './Member';

export default class Group {
  readonly _id: BSON.OjbectId;

  readonly members: [Member];
}
