import Vue from 'vue';
import VueRouter from 'vue-router';
import io from 'socket.io-client';
import Dashboard from '@/components/Common/Dashboard.vue';
import store from '@/store';

Vue.use(VueRouter);
const ifNotAuthenticated = (to, from, next) => { // Giriş yapılmışsa anasayfaya yönlendir.
  if (!store.getters.getToken) next();
  else next('/');
};
const ifAuthenticated = (to, from, next) => { // Giriş yapılmış mı kontrol et yoksa girişe yönlendir
  if (store.getters.getToken) {
    Vue.prototype.$socket = io(process.env.VUE_APP_SOCKET_URL);
    next();
  } else next({ name: 'login' });
};
export const routeMap = [{
  path: '/home',
  name: 'home',
  component: () => import('@/views/Home'),
  meta: {
    title: 'Genel Bakış',
    icon: 'el-icon-s-home',
  },
},
{
  path: '/monitoring',
  name: 'monitoring',
  redirect: { name: 'monitoringTable' },
  component: {
    render(c) { return c('router-view'); },
  },
  meta: {
    title: 'Canlı İzleme',
    icon: 'el-icon-user',
  },
  children: [{
    path: 'table',
    name: 'monitoringTable',
    component: () => import('@/views/Monitoring/List'),
    meta: {
      title: 'Tablo',
    },
  },
  {
    path: 'map',
    name: 'monitoringMap',
    component: () => import('@/views/Monitoring/Map'),
    meta: {
      title: 'Grafik',
    },
  },
  ],
},
{
  path: '/plan',
  name: 'plan',
  redirect: { name: 'mapPlan' },
  component: {
    render(c) { return c('router-view'); },
  },
  meta: {
    title: 'Kroki',
    icon: 'el-icon-user',
  },
  children: [{
    path: 'map',
    name: 'mapPlan',
    component: () => import('@/views/Plan/Map'),
    meta: {
      title: 'Harita Planı',
    },
  },
  ],
},
{
  path: '/user',
  name: 'user',
  redirect: { name: 'userList' },
  component: {
    render(c) { return c('router-view'); },
  },
  meta: {
    title: 'Kullanıcı Yönetimi',
    icon: 'el-icon-user',
  },
  children: [{
    path: 'list',
    name: 'userList',
    component: () => import('@/views/List/Default'),
    meta: {
      title: 'Kullanıcılar',
      configName: 'user',
    },
  },
  {
    path: 'form',
    name: 'userForm',
    component: () => import('@/views/Form/Basic'),
    meta: {
      title: 'Yeni Kullanıcı',
      configName: 'user',
    },
  },
  {
    path: 'form/:id',
    name: 'userEditForm',
    component: () => import('@/views/Form/Basic'),
    hidden: true,
    meta: {
      title: 'Kullanıcı Düzenle',
      configName: 'user',
    },
  },
  ],
},
{
  path: '/staff',
  name: 'staff',
  redirect: { name: 'staffList' },
  component: {
    render(c) { return c('router-view'); },
  },
  meta: {
    title: 'Personel Yönetimi',
    icon: 'el-icon-user',
  },
  children: [
    {
      path: 'list',
      name: 'staffList',
      component: () => import('@/views/List/Default'),
      meta: {
        title: 'Personeller',
        configName: 'staff',
      },
    },
    {
      path: 'form',
      name: 'staffForm',
      component: () => import('@/views/Form/Basic'),
      meta: {
        title: 'Yeni Personel',
        configName: 'staff',
      },
    },
    {
      path: 'form/:id',
      name: 'staffEditForm',
      component: () => import('@/views/Form/Basic'),
      hidden: true,
      meta: {
        title: 'Personel Düzenle',
        configName: 'staff',
      },
    },
    {
      path: 'scorings',
      name: 'staffScorings',
      component: () => import('@/views/Staff/Scorings'),
      meta: {
        title: 'Personel Puantaj',
      },
    },
    {
      path: 'scoring/:id',
      name: 'staffScoring',
      component: () => import('@/views/Staff/Scoring'),
      hidden: true,
      meta: {
        title: 'Personel Puantajı',
      },
    },
    {
      path: 'title',
      name: 'title',
      redirect: { name: 'titleList' },
      component: {
        render(c) { return c('router-view'); },
      },
      meta: {
        title: 'Unvan Yönetimi',
      },
      children: [{
        path: 'list',
        name: 'titleList',
        component: () => import('@/views/List/Default'),
        meta: {
          title: 'Unvanlar',
          configName: 'title',
        },
      },
      {
        path: 'form',
        name: 'titleForm',
        component: () => import('@/views/Form/Basic'),
        meta: {
          title: 'Yeni Unvan',
          configName: 'title',
        },
      },
      {
        path: 'form/:id',
        name: 'titleEditForm',
        component: () => import('@/views/Form/Basic'),
        hidden: true,
        meta: {
          title: 'Unvan Düzenle',
          configName: 'title',
        },
      },
      ],
    },
    {
      path: 'shift-period',
      name: 'shiftPeriod',
      redirect: { name: 'shiftPeriodList' },
      component: {
        render(c) { return c('router-view'); },
      },
      meta: {
        title: 'Vardiya Yönetimi',
      },
      children: [
        {
          path: 'list',
          name: 'shiftPeriodList',
          component: () => import('@/views/List/Default'),
          meta: {
            title: 'Vardiyalar',
            configName: 'shiftPeriod',
          },
        },
        {
          path: 'form',
          name: 'shiftPeriodForm',
          component: () => import('@/views/Form/Basic'),
          meta: {
            title: 'Yeni Vardiya',
            configName: 'shiftPeriod',
          },
        },
        {
          path: 'form/:id',
          name: 'shiftPeriodEditForm',
          component: () => import('@/views/Form/Basic'),
          hidden: true,
          meta: {
            title: 'Vardiya Düzenle',
            configName: 'shiftPeriod',
          },
        },
      ],
    },
  ],
},
{
  path: '/tracker',
  name: 'tracker',
  redirect: { name: 'trackerList' },
  component: {
    render(c) { return c('router-view'); },
  },
  meta: {
    title: 'Tracker Yönetimi',
    icon: 'el-icon-user',
  },
  children: [{
    path: 'list',
    name: 'trackerList',
    component: () => import('@/views/List/Default'),
    meta: {
      title: 'Trackerlar',
      configName: 'tracker',
    },
  },
  {
    path: 'form',
    name: 'trackerForm',
    component: () => import('@/views/Form/Basic'),
    meta: {
      title: 'Yeni Tracker',
      configName: 'tracker',
    },
  },
  {
    path: 'form/:id',
    name: 'trackerEditForm',
    component: () => import('@/views/Form/Basic'),
    hidden: true,
    meta: {
      title: 'Tracker Düzenle',
      configName: 'tracker',
    },
  },
  ],
},
{
  path: '/ibeacon',
  name: 'ibeacon',
  redirect: { name: 'ibeaconList' },
  component: {
    render(c) { return c('router-view'); },
  },
  meta: {
    title: 'Ibeacon Yönetimi',
    icon: 'el-icon-user',
  },
  children: [
    {
      path: 'list',
      name: 'ibeaconList',
      component: () => import('@/views/List/Default'),
      meta: {
        title: 'Ibeaconlar',
        configName: 'ibeacon',
      },
    },
    {
      path: 'form',
      name: 'ibeaconForm',
      component: () => import('@/views/Form/Basic'),
      meta: {
        title: 'Yeni Ibeacon',
        configName: 'ibeacon',
      },
    },
    {
      path: 'form/:id',
      name: 'ibeaconEditForm',
      component: () => import('@/views/Form/Basic'),
      hidden: true,
      meta: {
        title: 'Ibeacon Düzenle',
        configName: 'ibeacon',
      },
    },
    /* {
      path: 'ibeacon-group',
      name: 'ibeaconGroup',
      redirect: { name: 'ibeaconGroupList' },
      component: {
        render(c) { return c('router-view'); },
      },
      meta: {
        title: 'Grup Yönetimi',
      },
      children: [
        {
          path: 'list',
          name: 'ibeaconGroupList',
          component: () => import('@/views/List/Default'),
          meta: {
            title: 'Gruplar',
            configName: 'ibeaconGroup',
          },
        },
        {
          path: 'form',
          name: 'ibeaconGroupForm',
          component: () => import('@/views/Form/Basic'),
          meta: {
            title: 'Yeni Grup',
            configName: 'ibeaconGroup',
          },
        },
        {
          path: 'form/:id',
          name: 'ibeaconGroupEditForm',
          component: () => import('@/views/Form/Basic'),
          hidden: true,
          meta: {
            title: 'Grup Düzenle',
            configName: 'ibeaconGroup',
          },
        },
      ],
    }, */
  ],
},
{
  path: 'profile',
  name: 'Profile',
  hidden: true,
  component: () => import('@/views/Auth/Profile'),
},
];
export const routes = [{
  path: '/',
  name: 'dashboard',
  component: Dashboard,
  redirect: '/home',
  children: routeMap,
  beforeEnter: ifAuthenticated,
},
{
  path: '/login',
  name: 'login',
  component: () => import('@/views/Auth/Login'),
  beforeEnter: ifNotAuthenticated,
},
];

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// export default router;
