import { Request, Response } from 'express';

export default {
  'POST /api/getAllUsers': (req: Request, res: Response) => {
    res.send({
      total: 6,
      pageSize: 3,
      currentPage: 1,
      users: [
        {
          id: 1,
          userName: 'Cheung',
          roles: ['Admin', '大聪明'],
          avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        },
        {
          id: 2,
          userName: 'Askeladd',
          roles: ['Ant Design'],
          avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        },
        {
          id: 3,
          userName: '暖暖',
          roles: ['蚂蚁金服体验科技'],
          avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        },
        {
          id: 4,
          userName: 'YYYY',
          roles: ['TechUI'],
          avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        },
        {
          id: 5,
          userName: 'ZZZZ',
          roles: ['Operation'],
          avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        },
        {
          id: 6,
          userName: 'AAA',
          roles: ['Operation'],
          avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        },
        {
          id: 7,
          userName: 'AAA',
          roles: ['Operation'],
          avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        },
      ],
    });
  },
};
