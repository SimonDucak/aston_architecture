import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

function showValidation(el, expression, dirty) {
  const showValidatorOn = el.getAttribute("show-validators");

  if (showValidatorOn) {
    el.addEventListener(showValidatorOn, function() {
      if (!new Set(dirty).has(expression)) {
        dirty.push(expression);
      }
    });
  }
}

function onUpdateStore(el, binding) {
  if (el.value !== binding.value) {
    el.value = binding.value;
  }
}

Vue.directive('store-model-keyup', {
  bind: function(el, binding, vnode) {
    const moduleName = binding.expression.split(".")[0];
    const mutationName = binding.expression.split(".")[1].match(/([A-Z]?[^A-Z]*)/g).slice(0,-1).join("_").toUpperCase();

    el.addEventListener('keyup', function(event) {
      vnode.context.$store.commit(`${moduleName}/SET_${mutationName}`, event.target.value);
    });

    showValidation(el, binding.expression, vnode.context.dirty)
  },
  update: onUpdateStore
});

Vue.directive('store-model-blur', {
  bind: function(el, binding, vnode) {
    const moduleName = binding.expression.split(".")[0];
    const mutationName = binding.expression.split(".")[1].match(/([A-Z]?[^A-Z]*)/g).slice(0,-1).join("_").toUpperCase();

    el.addEventListener('blur', function(event) {
      vnode.context.$store.commit(`${moduleName}/SET_${mutationName}`, event.target.value);
    });

    showValidation(el, binding.expression, vnode.context.dirty)
  },
  update: onUpdateStore
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


