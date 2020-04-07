import Vue from 'vue';
import deepmerge from 'deepmerge';
import { StitchServiceError } from 'mongodb-stitch-browser-sdk';
import MongodbStitch from '@/lib/mongodb-stitch';

export default class VueMongodbStitch extends MongodbStitch {
  private state = {
    user: null,
  };

  constructor(settings = {}) {
    super({
      storeName: 'stitch',
      i18nPrefix: 'mongodbStitch',
      ...settings,
    });

    this.state = Vue.observable(this.state);

    this.loadI18nMessages();
  }

  get user() {
    return this.state.user;
  }

  set user(user) {
    this.state.user = user;
  }

  async auth() {
    if (!this.user && super.user) {
      await this.refreshCustomData();
      this.user = super.user;
    }
    return this.user;
  }

  async loginWithCredential(credential) {
    await super.loginWithCredential(credential);
    return this.auth();
  }

  async logout() {
    const loggedout = await super.logout();
    this.user = null;
    return loggedout;
  }

  get i18n() {
    return this.get('i18n') || null;
  }

  loadI18nMessages() {
    if (this.i18n) {
      const localesFiles = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
      localesFiles.keys().forEach((key) => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
          const locale = matched[1];
          const i18nPrefix = this.get('i18nPrefix');
          const previousLocaleMessages = this.i18n.messages[locale] || {};
          this.i18n.setLocaleMessage(locale, {
            ...previousLocaleMessages,
            [i18nPrefix]: deepmerge(localesFiles(key), previousLocaleMessages[i18nPrefix] || {}),
          });
        }
      });
    }
  }

  getErrorMessage(error: StitchServiceError) {
    let message = `${error.message.charAt(0).toUpperCase()}${error.message.slice(1)}`;
    if (this.i18n && this.i18n.t) {
      const i18nPrefix = this.get('i18nPrefix');
      message = (error.errorCodeName === 'Unknown')
        ? (message || this.i18n.t(`${i18nPrefix}.stitchError.code.${error.errorCodeName}`))
        : this.i18n.t(`${i18nPrefix}.stitchError.code.${error.errorCodeName}`);
    }
    return message;
  }
}
