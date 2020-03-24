import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import i18n from './plugins/i18n';
import vuetify from './plugins/vuetify';
import mongodbStitch from './plugins/mongodbStitch';
import i18n from './i18n';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  mongodbStitch,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
