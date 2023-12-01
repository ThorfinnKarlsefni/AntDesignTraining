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
    // access: 'canAdmin',
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
        name: '员工列表',
        path: '/admin/users',
        component: './Admin/Users',
      },
      {
        name: '菜单管理',
        path: '/admin/Menu',
        component: './Admin/Menu',
      },
      {
        name: '权限管理',
        path: '/admin/Permission',
        component: './Admin/Permission',
      },
      {
        name: '角色管理',
        path: '/admin/Role',
        component: './Admin/Role',
      },
      {
        name: '站点管理',
        path: '/admin/Station',
        component: './Admin/Station',
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
        icon: 'invoice',
        path: '/transport/invoices',
        component: './Transport/Invoices',
      },
    ],
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
