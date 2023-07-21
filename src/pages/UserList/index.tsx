import DeleteButton from '@/components/Buttons/delete';
import { getAllUsers } from '@/services/ant-design-pro/api';
import { ProList } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
import UserUpdateForm from './components/UserUpdateForm';

const roleColors: { [key: string]: string } = {
  Admin: 'red',
  Operation: 'green',
};

const defaultColor = 'cyan';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<API.CurrentUser[]>([]);
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
  };

  useEffect(() => {
    handlePageChange(10);
  }, []);

  const fetchUsers = async (page: number, pageSize: number) => {
    try {
      const response = await getAllUsers({
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

  const getRoleColor = (role: string) => roleColors[role] || defaultColor;

  function handleConfirm(): void {
    // throw new Error('Function not implemented.');
  }

  return (
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
      onDataSourceChange={setUsers}
      metas={{
        title: {
          dataIndex: 'userName',
        },
        avatar: {
          dataIndex: 'avatar',
          editable: false,
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
        },
        actions: {
          render: (text, row, index, action) => [
            <UserUpdateForm key={`update-${row.id}`} title="用户信息" user={row} />,
            <DeleteButton
              key={`delete-${row.id}`}
              title="Are you sure delete this task?"
              buttonText="禁用"
              content="确定要禁用当前用户吗?"
              onConfirm={handleConfirm}
            />,
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
  );
};

export default UserList;
