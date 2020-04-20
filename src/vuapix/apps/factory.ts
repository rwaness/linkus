import * as api from '@/apis/stitch/apps';

export default () => ({
  appsList: {
    doQuery() {
      return api.appsList();
    },
  },
  appDetail: {
    single: true,
    doQuery({ id }) {
      return api.appDetail({ id });
    },
  },
});
