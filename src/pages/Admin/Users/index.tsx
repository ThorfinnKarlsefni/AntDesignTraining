import DeleteButton from '@/components/Buttons/delete';
import { ProList } from '@ant-design/pro-components';
import { App, Badge, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getRoleList, getUserList } from '../services';
import UserCreateForm from './components/UserCreateForm';
import UserUpdateForm from './components/UserUpdateForm';

const roleColors: { [key: string]: string } = {
  Admin: 'red',
  Operation: 'green',
};

const defaultColor = 'cyan';

const renderBadge = (count: number, active = false) => {
  return (
    <Badge
      count={count}
      style={{
        marginBlockStart: -2,
        marginInlineStart: 4,
        color: active ? '#1890FF' : '#999',
        backgroundColor: active ? '#E6F7FF' : '#eee',
      }}
    />
  );
};

const Users: React.FC = () => {
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('tab1');

  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  // pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);

  const fetchUsers = async (page: number, pageSize: number) => {
    const response = await getUserList({
      skipErrorHandler: true,
      page,
      pageSize,
    });
    setUsers(response.users);
    setTotalItems(response.total);
    setCurrentPage(response.currentPage);
    setPageSize(response.pageSize);
  };

  const fetchRoleList = async () => {
    const roles = await getRoleList();
    setRoles(roles);
  };

  const handlePageChange = (page: number, pageSize?: number | undefined) => {
    setCurrentPage(page);
    if (pageSize !== undefined) {
      setCurrentPage(pageSize);
    }
    fetchUsers(page, pageSize || 3);
    fetchRoleList();
  };
  useEffect(() => {
    handlePageChange(10);
  }, []);

  const getRoleColor = (role: string) => roleColors[role] || defaultColor;

  const handleConfirm = async () => {
    return '1231';
  };

  return (
    <>
      <ProList<User>
        rowKey="id"
        headerTitle="员工列表"
        dataSource={users}
        showActions="hover"
        editable={
          {
            // onSave: async (key, record, originRow) => {
            // console.log(key, record, originRow);
            //   return true;
            // },
          }
        }
        toolbar={{
          menu: {
            activeKey,
            items: [
              {
                key: 'tab1',
                label: <span>全部用户{renderBadge(99, activeKey === 'tab1')}</span>,
              },
              {
                key: 'tab2',
                label: <span>禁用{renderBadge(32, activeKey === 'tab2')}</span>,
              },
            ],
            onChange(key) {
              setActiveKey(key);
            },
          },
          search: {
            placeholder: '请输入用户信息',
            onSearch: (value: string) => {
              alert(value);
            },
          },
          actions: [<UserCreateForm key="userCreateForm" />],
        }}
        onDataSourceChange={setUsers}
        metas={{
          title: {
            dataIndex: 'username',
            search: false,
          },
          avatar: {
            dataIndex: 'avatar',
            editable: false,
            search: false,
          },
          subTitle: {
            render: (text, row) => {
              const roles = row.roles || []; // 根据实际情况访问 role 属性
              return (
                <Space size={0}>
                  {roles.map((role) => (
                    <Tag key={role.id} color={getRoleColor(role.name)}>
                      {role.name}
                    </Tag>
                  ))}
                </Space>
              );
            },
            search: false,
          },
          actions: {
            render: (text, row) => [
              <UserUpdateForm
                key={`update-${row.id}`}
                title="用户信息"
                user={row}
                roleList={roles}
              />,
              <App key={`app-${row.id}`}>
                <DeleteButton
                  key={`delete-${row.id}`}
                  title="Are you sure delete this task?"
                  buttonText={activeKey === 'tab2' ? '恢复' : '禁用'}
                  content="确定要禁用当前用户吗?"
                  onOk={() => handleConfirm}
                />
              </App>,
            ],
          },
        }}
        pagination={{
          pageSize,
          current: currentPage,
          total: totalItems,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </>
  );
};

export default Users;
