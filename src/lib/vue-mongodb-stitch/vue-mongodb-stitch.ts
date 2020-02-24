import MongodbStitch from '@/lib/mongodb-stitch';

export default class VueMongodbStitch extends MongodbStitch {
  constructor(settings = {}) {
    super({
      storeName: 'stitch',
      ...settings,
    });
  }
}
