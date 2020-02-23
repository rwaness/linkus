import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
// import MongoDbStitch from './plugins/mongoDbStitch';
import './plugins/mongoDbStitch';

Vue.config.productionTip = false;

// Vue.use(MongoDbStitch);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
