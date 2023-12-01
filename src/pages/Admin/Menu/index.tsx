import { ProCard } from '@ant-design/pro-components';
import { App } from 'antd';
import { useEffect, useState } from 'react';
import { getRoleList } from '../services';
import CreateForm from './components/CreateForm';
import { default as MenuList, default as MenuTree } from './components/MenuList';
import { getMenuTree } from './services';

const Menu: React.FC = () => {
  const [menuTree, setMenuTree] = useState<MenuTree[]>([]);

  const [roleList, setRoleList] = useState<Role[]>([]);

  const roleItems = roleList.reduce((obj: any, item) => {
    obj[item.id] = item.name;
    return obj;
  }, {});

  const fetchMenuList = async () => {
    const menuTree = await getMenuTree();
    setMenuTree(menuTree);
  };
  const fetchRoleList = async () => {
    const roleList = await getRoleList();
    setRoleList(roleList);
  };

  useEffect(() => {
    fetchMenuList();
    fetchRoleList();
  }, []);

  return (
    <ProCard
      title="菜单"
      subTitle="菜单管理"
      style={{
        minHeight: 700,
      }}
      gutter={8}
    >
      <ProCard
        title="菜单"
        subTitle="列表"
        style={{ height: 600, overflow: 'hidden', overflowY: 'scroll' }}
        bordered
      >
        <App>
          <MenuList menuTree={menuTree} refreshMenuTree={fetchMenuList} roleItems={roleItems} />
        </App>
      </ProCard>
      <ProCard title="新增" subTitle="新增菜单" layout="center" bordered style={{ height: 600 }}>
        <CreateForm menuTree={menuTree} refreshMenuTree={fetchMenuList} roleItems={roleItems} />
      </ProCard>
    </ProCard>
  );
};

export default Menu;
