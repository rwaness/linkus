import mongodbStitch from '@/services/mongodbStitchService';
import {
  getIdQuery,
  getGuestsUpdates,
  getInvitationsQuery,
  getInvitationQuery,
  getDeleteInvitationUpdates,
} from './helpers';

const collection = mongodbStitch.db.collection('groups');

export function groupsList() {
  return collection.find({
    memberIds: mongodbStitch.user.id,
  }, {
    limit: 100,
  }).asArray();
}

export async function newGroup({ name, guests }) {
  const owner = mongodbStitch.user.customData;
  const group = {
    owner: owner.id,
    name,
    guests,
    memberIds: [owner.id],
    members: [
      {
        id: owner.id,
        ...owner.profile,
      },
      ...getGuestsUpdates(guests, owner),
    ],
  };
  const { insertedId } = await collection.insertOne(group);
  return {
    _id: insertedId,
    ...group,
  };
}

export function invite({ group, guests }) {
  const owner = mongodbStitch.user.customData;
  return collection.findOneAndUpdate({
    ...getIdQuery(group.id),
  }, {
    $addToSet: {
      guests: { $each: guests },
      members: { $each: getGuestsUpdates(guests, owner) },
    },
  }, {
    returnNewDocument: true,
  });
}

export function invitationsList() {
  return collection.find({
    ...getInvitationsQuery(),
  }).asArray();
}

export function acceptInvitation({ group }) {
  return collection.findOneAndUpdate({
    ...getInvitationQuery(group),
  }, {
    ...getDeleteInvitationUpdates(),
    $addToSet: {
      memberIds: mongodbStitch.user.id,
    },
  }, {
    returnNewDocument: true,
  });
}

export function rejectInvitation({ group }) {
  return collection.findOneAndUpdate({
    ...getInvitationQuery(group),
  }, {
    ...getDeleteInvitationUpdates(),
  }, {
    returnNewDocument: true,
  });
}

export function groupDetail({ id }) {
  return collection.findOne(getIdQuery(id));
}
