import { BSON } from 'mongodb-stitch-browser-sdk';

export default class Guest {
  readonly email: string;

  readonly invitedBy: BSON.OjbectId;
}
