import { Stitch, RemoteMongoClient, AnonymousCredential } from 'mongodb-stitch-browser-sdk';

// defined stitch objects
const anonymous = new AnonymousCredential();

// expose global object
class MongoDbStitch {
  // default settings
  clientName = 'linkus-wweeb';

  serviceName = 'mongodb-atlas';

  dbName = 'linkus';

  client = null;

  cluster = null;

  constructor(options = {}) {
    // set options
    if (options.clientName) {
      this.clientName = options.clientName;
    }
    if (options.serviceName) {
      this.serviceName = options.serviceName;
    }
    if (options.dbName) {
      this.dbName = options.dbName;
    }

    // initialize stitch objects
    this.client = Stitch.initializeDefaultAppClient(this.clientName);
    this.cluster = this.client.getServiceClient(
      RemoteMongoClient.factory,
      this.serviceName,
    );
  }

  db(name) {
    return this.cluster.db(name || this.dbName);
  }

  login({ credential = anonymous } = {}) {
    return this.client.auth.loginWithCredential(credential);
  }
}

// add plugin
MongoDbStitch.install = (Vue) => {
  /* eslint-disable-next-line no-param-reassign */
  Vue.prototype.$mongoDbStitch = new MongoDbStitch();
};

export default MongoDbStitch;
