import * as helpers from './helpers';

export const formatGuest = (guest, group) => {
  const invitedBy = (typeof guest.invitedBy === 'string')
    ? group.members.find(({ id }) => guest.invitedBy === id)
    : guest.invitedBy;
  return {
    ...guest,
    invitedBy: invitedBy || {},
  };
};

export const formatMember = (member, group) => (group.guests.includes(member.email)
  ? formatGuest(member, group)
  : member);

export const formatGroup = (group) => ({
  ...group,
  id: helpers.getGroupId(group),
  plugins: [],
  members: (group.members || []).map((member) => formatMember(member, group)),
});
