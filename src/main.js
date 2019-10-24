import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

Vue.directive('store-model', {
  bind: function(el, binding, vnode) {
    const moduleName = binding.expression.split(".")[0];
    const mutationName = binding.expression.split(".")[1].match(/([A-Z]?[^A-Z]*)/g).slice(0,-1).join("_").toUpperCase();

    let commitOn = el.getAttribute("commit-on");

    if (!commitOn) {
      commitOn = "keyup";
    }

    el.addEventListener(commitOn, function(event) {
      vnode.context.$store.commit(`${moduleName}/SET_${mutationName}`, event.target.value);
    });

    const showValidatorOn = el.getAttribute("show-validators");

    if (showValidatorOn) {
      el.addEventListener(showValidatorOn, function() {
        const { dirty } = vnode.context;
        if (!new Set(dirty).has(binding.expression)) {
          dirty.push(binding.expression);
        }
      });
    }
  },
  update: function(el, binding) {
    if (el.value !== binding.value) {
      el.value = binding.value;
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


