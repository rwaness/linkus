import { getId } from '@/services/mongodbStitchService';

/* eslint-disable import/prefer-default-export */
export const formatUser = (user) => ({
  ...user,
  id: getId(user),
});
