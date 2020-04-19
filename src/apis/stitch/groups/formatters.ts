import { Group, Member, Guest } from '@/models';
import { getId } from '@/services/mongodbStitchService';

export function formatGuest(guest, group): Guest {
  const invitedBy = (typeof guest.invitedBy === 'string')
    ? group.members.find(({ id }) => guest.invitedBy === id)
    : guest.invitedBy;
  return {
    ...guest,
    invitedBy: invitedBy || {},
  };
}

export function formatMember(member, group): Member {
  return (group.guests.includes(member.email)
    ? formatGuest(member, group)
    : member);
}

export function formatGroup(group): Group {
  return {
    ...group,
    id: getId(group),
    plugins: [],
    members: (group.members || []).map((member) => formatMember(member, group)),
  };
}
