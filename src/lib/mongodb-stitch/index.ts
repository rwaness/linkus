import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential,
  UserPasswordCredential,
  UserPasswordAuthProviderClient,
} from 'mongodb-stitch-browser-sdk';

export default class VueMongodbStitch {
  // default settings
  settings = {
    clientAppId: '<client-app-id>',
    mongoServiceName: 'mongodb-atlas',
    defaultDb: '<default-database>',
  }

  stitchApp = null

  mongoService = null

  db = null

  user = null

  constructor(settings = {}) {
    // set settings
    if (settings.clientAppId) {
      this.settings.clientAppId = settings.clientAppId;
    }
    if (settings.mongoServiceName) {
      this.settings.mongoServiceName = settings.mongoServiceName;
    }
    if (settings.defaultDb) {
      this.settings.defaultDb = settings.defaultDb;
    }

    // init stitch app
    this.stitchApp = Stitch.initializeDefaultAppClient(this.settings.clientAppId);

    // init mon service
    this.mongoService = this.stitchApp.getServiceClient(
      RemoteMongoClient.factory,
      this.settings.mongoServiceName,
    );

    // set to default db
    this.setDb(this.settings.defaultDb);
  }

  setDb(name) {
    this.db = this.mongoService.db(name || this.settings.defaultDb);
    return this.db;
  }

  setUser(user) {
    this.user = user || null;
    return this.user;
  }

  tryAuth() {
    return this.user || this.setUser(this.stitchApp.auth.user);
  }

  async loginWithCredential(credential = new AnonymousCredential()) {
    return this.setUser(await this.stitchApp.auth.loginWithCredential(credential));
  }

  loginWithEmailAndPassword(email, password) {
    return this.loginWithCredential(new UserPasswordCredential(email, password));
  }

  getEmailPwdClient() {
    return this.stitchApp.auth.getProviderClient(UserPasswordAuthProviderClient.factory);
  }

  registerWithEmail(email, password) {
    return this.getEmailPwdClient().registerWithEmail(email, password);
  }

  confirmeUser(token, tokenId) {
    return this.getEmailPwdClient().confirmeUser(token, tokenId);
  }

  sendResetPasswordEmail(email) {
    return this.getEmailPwdClient().sendResetPasswordEmail(email);
  }

  resetPassword(token, tokenId, newPassword) {
    return this.getEmailPwdClient().resetPassword(token, tokenId, newPassword);
  }
}
