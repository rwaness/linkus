import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential,
  UserPasswordCredential,
  UserPasswordAuthProviderClient,
} from 'mongodb-stitch-browser-sdk';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';

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

  graphqlClient = null

  constructor(settings = {}) {
    // set settings
    this.settings = {
      ...this.settings,
      ...settings,
    };

    // init stitch app
    this.stitchApp = Stitch.initializeDefaultAppClient(this.get('clientAppId'));

    // init mongo service
    this.mongoService = this.stitchApp.getServiceClient(
      RemoteMongoClient.factory,
      this.get('mongoServiceName'),
    );

    // set default db
    this.setDb(this.get('defaultDb'));
  }

  get graphql() {
    if (!this.user) throw new Error('GraphQL query need to be authenticated');

    if (!this.graphqlClient) {
      const authorizationHeaderLink = setContext(async (_, { headers }) => ({
        headers: {
          ...headers,
          Authorization: `Bearer ${this.user.authInfo.accessToken}`,
        },
      }));
      this.graphqlClient = new ApolloClient({
        link: authorizationHeaderLink.concat(new HttpLink({
          uri: `https://stitch.mongodb.com/api/client/v2.0/app/${this.get('clientAppId')}/graphql`,
        })),
        cache: new InMemoryCache(),
      });
    }
    return this.graphqlClient;
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

  logout() {
    this.user = null;
    this.graphqlClient = null;
    this.stitchApp.auth.logout();
  }
}
