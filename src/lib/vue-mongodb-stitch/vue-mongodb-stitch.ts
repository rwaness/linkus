import {
  StitchServiceError,
} from 'mongodb-stitch-browser-sdk';
import MongodbStitch from '@/lib/mongodb-stitch';

export default class VueMongodbStitch extends MongodbStitch {
  constructor(settings = {}) {
    super({
      storeName: 'stitch',
      ...settings,
    });
  }

  get $t() {
    const i18n = this.get('i18n');
    const $t = i18n && i18n.t;
    return $t ? $t.bind(i18n) : null;
  }

  getErrorMessage(error: StitchServiceError) {
    let message = `${error.message.charAt(0).toUpperCase()}${error.message.slice(1)}`;
    if (this.$t) {
      message = (error.errorCodeName === 'Unknown')
        ? (message || this.$t(`mongodbStitch.error.code.${error.errorCodeName}`))
        : this.$t(`mongodbStitch.error.code.${error.errorCodeName}`);
    }
    return message;
  }
}
