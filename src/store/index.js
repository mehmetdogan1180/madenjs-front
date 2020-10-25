import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-cycle
import auth from '@/store/modules/auth';
import dashboard from '@/store/modules/dashboard';
// eslint-disable-next-line import/no-cycle
import monitoring from '@/store/modules/monitoring';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    dashboard,
    monitoring,
  },
});
