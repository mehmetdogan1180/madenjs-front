import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
// eslint-disable-next-line import/no-cycle
import store from '@/store';

// TODO: Ayarlar tek bir yere taşınacak
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.authorization = `Bearer ${store.getters.getToken}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    const { status } = response;
    // console.log('requestResponse', response);
    if (status === 200) {
      return response.data;
    }
    return Promise.reject(new Error(response.statusText || 'Error'));
  },
  (error) => {
    // console.log('requestError', error);
    const errorResponse = error.response || false;
    if (errorResponse && errorResponse.status === 401) {
      MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        confirmButtonText: 'Re-Login',
        showCancelButton: false,
        closeOnPressEscape: false,
        closeOnClickModal: false,
        showClose: false,
        type: 'warning',
      }).then(() => {
        store.dispatch('authLogout').then(() => {
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        });
      });
    } else if (errorResponse && errorResponse.status === 422) {
      const msg = error.response.data.errors.map((e) => e.msg);
      Message({
        dangerouslyUseHTMLString: true,
        message: msg.join('<br>'),
        type: 'error',
        duration: 5 * 1000,
      });
    } else {
      Message({
        message: error.response.data || error,
        type: 'error',
        duration: 5 * 1000,
      });
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('showedMessage');
  },
);

export default service;
