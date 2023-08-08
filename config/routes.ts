export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/welcome',
    name: '实时监控',
    icon: 'dashboard',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: '系统',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Admin',
      },
      {
        name: '管理员',
        icon: 'user',
        path: '/admin/list',
      },
    ],
  },
  {
    path: 'transport',
    name: '运输管理',
    icon: 'car',
    routes: [
      {
        path: '/transport/',
        redirect: '/transport/invoices',
      },
      {
        name: '收货开票',
        icon: 'file',
        path: '/transport/invoices',
        component: './Transport/Invoices',
      },
    ],
  },
  {
    name: '员工列表',
    icon: 'user',
    path: '/users',
    component: './Users',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
