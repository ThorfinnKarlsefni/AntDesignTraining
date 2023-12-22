import { ProColumnType, ProTable } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import CreateForm from './component/CreateForm';
import { getPermissionList } from './services';

const columns: ProColumnType<PermissionItem>[] = [
  {
    // key: 'name',
    title: '名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    // key: 'httpMethod',
    title: '请求方法',
    dataIndex: 'httpMethod',
    align: 'center',
  },
  {
    //    key: 'httpPath',
    title: '请求路径',
    dataIndex: 'httpPath',
    align: 'center',
  },
  {
    // key: 'createdAt',
    title: '创建时间',
    dataIndex: 'createdAt',
    align: 'center',
  },
];

const Permission = () => {
  const [dataSource, setDataSource] = useState<PermissionItem[]>();

  const fetchPermission = async () => {
    const permissionList = await getPermissionList();
    setDataSource(permissionList);
  };

  // const handleDragSortEnd = async () =>
  // beforeIndex: number,
  // afterIndex: number,
  // newDataSource: PermissionItem[],
  // {
  //   await dragSort();
  //   await fetchPermission();
  //   message.success('update success');
  // };

  useEffect(() => {
    fetchPermission();
  }, []);

  return (
    <>
      <ProTable<PermissionItem>
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
        search={false}
        toolBarRender={() => [<CreateForm key={'CreatePermissionForm'} />]}
      />
    </>
  );
};

export default Permission;
