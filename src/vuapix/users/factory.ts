import * as api from '@/apis/stitch/users';

export default () => ({
  userDetail: {
    single: true,
    doQuery({ id }) {
      return api.userDetail({ id });
    },
  },
  updateProfile: {
    single: true,
    doQuery({ profile, confidentiality }) {
      return api.updateProfile({ profile, confidentiality });
    },
  },
  flagAsOnBoarded: {
    single: true,
    doQuery() {
      return api.flagAsOnBoarded();
    },
  },
});
