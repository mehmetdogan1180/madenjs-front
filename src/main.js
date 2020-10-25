import Vue from 'vue';
import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/tr-TR';
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/tr.json';
import moment from 'moment';
import App from './App.vue';
import { router } from './router';
import store from './store';
import request from './helpers/request';
import '@/assets/template/index.scss';


Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule], // assign message
  });
});
Vue.prototype.$request = request;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;
Vue.use(Element, { locale });
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
