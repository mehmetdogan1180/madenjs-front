// eslint-disable-next-line import/no-cycle
import request from '@/helpers/request';
import api from '@/api/auth';

const userInfo = {
  name: '',
  surname: '',
};
export default {
  state: {
    token: localStorage.getItem('token') || '',
    userInfo,
  },
  getters: {
    getToken: (state) => state.token,
    getUserInfo: (state) => state.userInfo,
  },
  mutations: {
    setToken: (state, token) => {
      localStorage.setItem('token', token);
      state.token = token;
    },
    clearUser: (state) => {
      state.userInfo = userInfo;
      state.token = '';
    },
    setUserInfo: (state, info) => {
      state.userInfo = info;
    },
  },
  actions: {
    authRequest: ({ commit }, user) => new Promise((resolve, reject) => {
      request({
        method: 'post',
        ...api.login,
        data: user,
      }).then((data) => {
        commit('setToken', data);
        resolve();
      }).catch((err) => {
        reject(err);
      });
    }),
    // eslint-disable-next-line no-unused-vars
    authLogout: ({ commit, getters }) => new Promise((resolve) => {
      /* const token = getters.getToken;
      request({
        url: '/authentication/logout',
        method: 'post',
        data: { token },
      }); */
      localStorage.removeItem('token');
      commit('clearUser');
      resolve();
    }),
    authInfo: ({ commit }) => new Promise((resolve, reject) => {
      request({
        method: 'get',
        ...api.info,
      }).then((data) => {
        commit('setUserInfo', { ...userInfo, ...data });
        resolve();
      }).catch((err) => {
        reject(err);
      });
    }),
  },
};
