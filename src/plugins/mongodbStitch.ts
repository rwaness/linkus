import Vue from 'vue';
import VueMongodbStitch from '@/lib/vue-mongodb-stitch';

// instantiate stitch
const mongodbStitch = new VueMongodbStitch({
  clientAppId: 'linkus-wweeb',
  defaultDb: 'linkus',
});

// define plugin
VueMongodbStitch.install = (V) => {
  /* eslint-disable-next-line no-param-reassign */
  V.prototype.$mongodbStitch = mongodbStitch;
};

// add plugin
Vue.use(VueMongodbStitch);

export default mongodbStitch;
