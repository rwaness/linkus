import Vue from 'vue';

export default Vue.component('Vnode', {
  functional: true,

  render(_, { props: { vnode, ...props }, listeners }) {
    /* eslint-disable no-param-reassign */
    vnode.componentOptions.propsData = {
      ...vnode.componentOptions.propsData,
      ...props,
    };
    vnode.componentOptions.listeners = {
      ...vnode.componentOptions.listeners,
      ...listeners,
    };
    return vnode;
  },
});
