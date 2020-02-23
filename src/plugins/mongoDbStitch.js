import Vue from 'vue';
import MongoDbStitch from '@/lib/stitch/mongoDbStitch';

// instantiate stitch
const mongoDbStitch = new MongoDbStitch({
  clientAppId: 'linkus-wweeb',
  defaultDb: 'linkus',
});

// define plugin
MongoDbStitch.install = (V) => {
  /* eslint-disable no-param-reassign */
  // Vue.mongoDbStitch = mongoDbStitch;
  V.prototype.$mongoDbStitch = mongoDbStitch;
};

// add plugin
Vue.use(MongoDbStitch);

export default mongoDbStitch;
