import Vue from 'vue';
import VueMongodbStitch from '@/lib/vue-mongodb-stitch';
import mongodbStitch from '@/services/mongodbStitch';

// define plugin
VueMongodbStitch.install = (V) => {
  /* eslint-disable-next-line no-param-reassign */
  V.prototype.$mongodbStitch = mongodbStitch;
};

// add plugin
Vue.use(VueMongodbStitch);

export default mongodbStitch;
