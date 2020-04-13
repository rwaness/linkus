import VueMongodbStitch from '@/lib/vue-mongodb-stitch';
import vueI18n from '@/plugins/i18n';

// instantiate stitch
const mongodbStitch = new VueMongodbStitch({
  clientAppId: 'linkus-wweeb',
  defaultDb: 'linkus',
  i18n: vueI18n,
});

export default mongodbStitch;
