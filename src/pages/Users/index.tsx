import DeleteButton from '@/components/Buttons/delete';
import { getRoleList, getUserList } from '@/services/ant-design-pro/api';
import { ProList } from '@ant-design/pro-components';
import { App, Badge, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
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

  const [users, setUsers] = useState<API.CurrentUser[]>([]);
  const [roles, setRoles] = useState<API.Role[]>([]);
  // paginstion
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);

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

  const fetchUsers = async (page: number, pageSize: number) => {
    try {
      const response = await getUserList({
        skipErrorHandler: true,
        page,
        pageSize,
      });
      setUsers(response.users);
      setTotalItems(response.total);
      setCurrentPage(response.currentPage);
      setPageSize(response.pageSize);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoleList = async () => {
    try {
      const roles = await getRoleList({
        skipErrorHandler: true,
      });
      setRoles(roles);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoleColor = (role: string) => roleColors[role] || defaultColor;

  function handleConfirm(): void {
    // throw new Error('Function not implemented.');
  }

  return (
    <>
      <ProList<API.CurrentUser>
        rowKey="id"
        headerTitle="用户列表"
        dataSource={users}
        showActions="hover"
        editable={{
          onSave: async (key, record, originRow) => {
            console.log(key, record, originRow);
            return true;
          },
        }}
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
          actions: [<UserCreateForm title="创建用户" />],
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
            render: (text, row, index, action) => {
              const roles = row.roles || []; // 根据实际情况访问 role 属性
              return (
                <Space size={0}>
                  {roles.map((role) => (
                    <Tag key={role} color={getRoleColor(role)}>
                      {role}
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
                  buttonText={activeKey == 'tab2' ? '恢复' : '禁用'}
                  content="确定要禁用当前用户吗?"
                  onConfirm={handleConfirm}
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
