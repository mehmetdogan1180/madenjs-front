import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/components/Common/Dashboard.vue';

Vue.use(VueRouter);
export const routeMap = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home'),
    meta: {
      title: 'Genel Bakış',
      icon: 'el-icon-s-home',
    },
  },
  {
    path: '/staff',
    name: 'Staff',
    redirect: '/staff/list',
    component: {
      render(c) { return c('router-view'); },
    },
    meta: {
      title: 'Personel Yönetimi',
      icon: 'el-icon-user',
    },
    children: [
      {
        path: '/staff/list',
        name: 'StaffList',
        component: () => import('@/views/List/Default'),
        meta: {
          title: 'Personeller',
          configName: 'staff',
        },
      },
      {
        path: '/staff/form',
        name: 'StaffForm',
        component: () => import('@/views/Form/Basic'),
        meta: {
          title: 'Personel Ekle',
          configName: 'staff',
        },
      },
    ],
  },
  {
    path: 'profile',
    name: 'Profile',
    component: () => import('@/views/Auth/Profile'),
  },
];
export const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    redirect: '/home',
    children: routeMap,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Auth/Login'),
  },
];

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// export default router;
