import Vue from 'vue';
import Vuetify from 'vuetify';
// it should be "import Vuetify from 'vuetify';"
// but in that case components could not be used as "<component :is="v-comp"></component>"

Vue.use(Vuetify);

export default new Vuetify({
});
