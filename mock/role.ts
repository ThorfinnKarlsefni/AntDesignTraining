import { Request, Response } from 'express';

export default {
  'POST /api/roleList': (req: Request, res: Response) => {
    res.send([
      { name: 'admin', createTime: '2022-01-03' },
      { name: 'Ant Design' },
      { name: '大聪明' },
      { name: 'Operation' },
      { name: 'service' },
    ]);
  },
};
