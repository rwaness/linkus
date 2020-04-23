import Vue from 'vue';

export default Vue.component('AsyncError', {
  render(h) {
    console.log('AsyncError');
    return h('div', 'ERRROR !!!!!');
  },
});
