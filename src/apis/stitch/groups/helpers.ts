import { BSON } from 'mongodb-stitch-browser-sdk';
import mongodbStitch, { getId } from '@/services/mongodbStitchService';

export const getIdQuery = (id) => ({ _id: new BSON.ObjectId(id) });

export const getInvitationsQuery = () => ({
  guests: mongodbStitch.user.profile.email,
  memberIds: { $nin: [mongodbStitch.user.id] },
});

export const getInvitationQuery = (group) => ({
  _id: getId(group, false),
  ...getInvitationsQuery(),
});

export const getGuestsUpdates = (guests, owner) => guests.map((guest) => ({
  email: guest,
  invitedBy: owner.id,
}));

export const getDeleteInvitationUpdates = () => ({
  $pull: {
    guests: mongodbStitch.user.profile.email,
  },
});
