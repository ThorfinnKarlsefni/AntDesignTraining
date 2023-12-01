import DeleteButton from '@/components/Buttons/delete';
import { ProCard, ProList } from '@ant-design/pro-components';
import { App, message } from 'antd';
import { useEffect, useState } from 'react';
import { getRoleList } from '../services';
import RoleCreateForm from './components/RoleCreateForm';
import { removeRole } from './services';

const Role: React.FC = () => {
  const [roleList, setRoleList] = useState<Role[]>([]);

  const fetchRoleList = async () => {
    const res = await getRoleList();
    setRoleList(res);
    return true;
  };

  const refreshRoleList = async () => {
    await fetchRoleList();
  };

  const handleDeleteConfirm = async (roleId: string) => {
    await removeRole(roleId);
    message.success('删除成功');
    return true;
  };

  useEffect(() => {
    fetchRoleList();
  }, []);

  return (
    <>
      <ProCard title="角色" subTitle="列表" style={{ height: 700 }}>
        <ProList<Role>
          toolbar={{
            menu: {},
            search: {
              placeholder: '请输入角色名称',
              onSearch: () => {},
            },
            actions: [<RoleCreateForm key="roleCreateForm" refreshRoleList={refreshRoleList} />],
          }}
          metas={{
            title: { dataIndex: 'name' },
            description: { dataIndex: 'id' },
            content: { dataIndex: 'createdAt' },
            actions: {
              render: (text, row) => [
                <App key={`update-${row.id}`}>
                  <a target="_blank" key="waring">
                    编辑
                  </a>
                </App>,
                <App key={`delete-${row.id}`}>
                  <DeleteButton
                    title="Are you sure delete this task?"
                    buttonText="删除"
                    content="确定要删除当前角色吗?"
                    onOk={() => handleDeleteConfirm(row.id)}
                  />
                </App>,
              ],
            },
          }}
          dataSource={roleList}
          pagination={{
            pageSize: 7,
            current: 1,
            total: roleList.length,
          }}
        />
      </ProCard>
    </>
  );
};

export default Role;
