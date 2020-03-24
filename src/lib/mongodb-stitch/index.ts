import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential,
  UserPasswordCredential,
  UserPasswordAuthProviderClient,
} from 'mongodb-stitch-browser-sdk';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';

export default class MongodbStitch {
  // default settings
  settings = {
    clientAppId: '<client-app-id>',
    mongoClientName: 'mongodb-atlas',
    defaultDb: '<default-database>',
  }

  stitchApp = null

  mongoClient = null

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

    // init mongo client
    this.mongoClient = this.stitchApp.getServiceClient(
      RemoteMongoClient.factory,
      this.get('mongoClientName'),
    );

    // set default db
    this.setDb(this.get('defaultDb'));
  }

  get(settingName) {
    return this.settings[settingName];
  }

  setDb(name) {
    this.db = this.mongoClient.db(name);
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

  get userPasswordAuthProviderClient() {
    return this.stitchApp.auth.getProviderClient(UserPasswordAuthProviderClient.factory);
  }

  registerWithEmail(email, password) {
    return this.userPasswordAuthProviderClient.registerWithEmail(email, password);
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

  logout() {
    this.user = null;
    this.graphqlClient = null;
    this.stitchApp.auth.logout();
  }
}
