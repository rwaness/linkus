import * as api from '@/apis/stitch/users';

export const userDetail = {
  single: true,
  doQuery({ id }) {
    return api.userDetail({ id });
  },
};

export const updateProfile = {
  single: true,
  doQuery({ profile, confidentiality }) {
    return api.updateProfile({ profile, confidentiality });
  },
};

export const flagAsOnBoarded = {
  single: true,
  doQuery() {
    return api.flagAsOnBoarded();
  },
};
