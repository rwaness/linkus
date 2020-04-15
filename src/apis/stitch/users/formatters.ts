import * as helpers from './helpers';

/* eslint-disable import/prefer-default-export */
export const formatUser = (user) => ({
  ...user,
  id: helpers.getUserId(user),
});
