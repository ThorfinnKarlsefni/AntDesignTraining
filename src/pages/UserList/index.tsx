import { getAllUsers } from '@/services/ant-design-pro/api';
import { ProList } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import { Key, useEffect, useState } from 'react';

const roleColors: { [key: string]: string } = {
  Admin: 'red',
  Operation: 'green',
};

const defaultColor = 'cyan';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<API.CurrentUser[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getAllUsers({
        skipErrorHandler: true,
      });
      setUsers(fetchedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoleColor = (role: string) => roleColors[role] || defaultColor;

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
            <a
              onClick={() => {
                action?.startEditable(row.id as Key);
              }}
              key="link"
            >
              编辑
            </a>,
          ],
        },
      }}
    />
  );
};

export default UserList;
