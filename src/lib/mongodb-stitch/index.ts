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
    this.settings = {
      ...this.settings,
      ...settings,
    };

    // init stitch app
    this.stitchApp = Stitch.initializeDefaultAppClient(this.get('clientAppId'));

    // init mon service
    this.mongoService = this.stitchApp.getServiceClient(
      RemoteMongoClient.factory,
      this.get('mongoServiceName'),
    );

    // set default db
    this.setDb(this.get('defaultDb'));
  }

  get(settingName) {
    return this.settings[settingName];
  }

  setDb(name) {
    this.db = this.mongoService.db(name || this.get('defaultDb'));
    return this.db;
  }

  setUser(user) {
    this.user = user || null;
    return this.user;
  }

  auth() {
    return this.user || this.setUser(this.stitchApp.auth.user);
  }

  async loginWithCredential(credential) {
    return this.setUser(await this.stitchApp.auth.loginWithCredential(credential));
  }

  loginAnonymous() {
    return this.loginWithCredential(new AnonymousCredential());
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
