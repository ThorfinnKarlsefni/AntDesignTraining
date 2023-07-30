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
      //   {
      //     name: '角色',
      //     icon: 'user',
      //     path: '/admin/list',
      //   },
      //   {
      //     name: '权限',
      //     icon: 'user',
      //     path: '/admin/list',
      //   },
    ],
  },
  {
    path: 'transportation',
    name: '运输管理',
    icon: 'car',
    routes: [
      {
        path: '/transportation/',
        redirect: '/transportation/invoices',
      },
      {
        name: '收货开票',
        icon: 'file',
        path: '/transportation/invoices',
        component: './Transportation/Invoices',
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
