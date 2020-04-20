import mongodbStitch from '@/services/mongodbStitchService';
import {
  getIdQuery,
  getGuestsUpdates,
  getInvitationsQuery,
  getInvitationQuery,
  getDeleteInvitationUpdates,
} from './helpers';
import { formatGroup } from './formatters';

const collection = mongodbStitch.db.collection('groups');

export async function groupsList() {
  return (await collection.find({
    memberIds: mongodbStitch.user.id,
  }, {
    limit: 100,
  }).asArray()).map(formatGroup);
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
  return formatGroup({
    _id: insertedId,
    ...group,
  });
}

export async function invite({ group, guests }) {
  const owner = mongodbStitch.user.customData;
  return formatGroup(await collection.findOneAndUpdate({
    ...getIdQuery(group.id),
  }, {
    $addToSet: {
      guests: { $each: guests },
      members: { $each: getGuestsUpdates(guests, owner) },
    },
  }, {
    returnNewDocument: true,
  }));
}

export async function invitationsList() {
  return (await collection.find({
    ...getInvitationsQuery(),
  }).asArray()).map(formatGroup);
}

export async function acceptInvitation({ group }) {
  return formatGroup(await collection.findOneAndUpdate({
    ...getInvitationQuery(group),
  }, {
    ...getDeleteInvitationUpdates(),
    $addToSet: {
      memberIds: mongodbStitch.user.id,
    },
  }, {
    returnNewDocument: true,
  }));
}

export async function rejectInvitation({ group }) {
  return formatGroup(await collection.findOneAndUpdate({
    ...getInvitationQuery(group),
  }, {
    ...getDeleteInvitationUpdates(),
  }, {
    returnNewDocument: true,
  }));
}

export async function groupDetail({ id }) {
  return formatGroup(await collection.findOne(getIdQuery(id)));
}
