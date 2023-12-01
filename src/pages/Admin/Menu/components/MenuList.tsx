import { ExclamationCircleOutlined } from '@ant-design/icons';
import { App, Button, Tree, TreeProps } from 'antd';
import { useState } from 'react';
import { deleteMenu, getMenu, updateMenuTree, updateMenuVisibility } from '../services';
import UpdateForm from './UpdateForm';

const MenuList: React.FC<MenuTreeProps> = ({ menuTree, refreshMenuTree, roleItems }) => {
  const { modal, message } = App.useApp();
  const [open, setOpen] = useState(false);
  const [editedItem, setEditedItem] = useState<MenuItem>();

  const handleUpdateMenuTree = async (id: number, params: UpdateMenuTreeItem) => {
    await updateMenuTree(id, params);
    await refreshMenuTree();
    message.success('更新完成');
    return true;
  };

  const onDrop: TreeProps['onDrop'] = (info: any) => {
    const dragKey = info.dragNode.key;
    const dropKey = info.node.key;
    const dropPosition = info.dropPosition;
    const parent = info.node.parent;
    const dropToGap = info.dropToGap;

    handleUpdateMenuTree(dragKey, { parent, dropToGap, dropKey, dropPosition });
  };

  const handleDeleteNode = async (id: number) => {
    await deleteMenu(id);
    await refreshMenuTree();
    message.success('删除成功');
  };

  const showDeleteConfirm = async (id: number) => {
    modal.confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '是否删除菜单?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => handleDeleteNode(id),
    });
  };

  const handleEditNode = async (id: number) => {
    const menu = await getMenu(id);
    setEditedItem(menu);
    setOpen(true);
  };

  const handleHideNode = async (id: number) => {
    await updateMenuVisibility(id);
    await refreshMenuTree();
    message.success('更新成功');
  };

  const renderNodeTitle = (item: any) => {
    return (
      <>
        <span>{item.title}</span>
        <Button type="link" style={{ float: 'right' }} onClick={() => showDeleteConfirm(item.key)}>
          删除
        </Button>
        <Button type="link" style={{ float: 'right' }} onClick={() => handleEditNode(item.key)}>
          编辑
        </Button>
        <Button type="link" style={{ float: 'right' }} onClick={() => handleHideNode(item.key)}>
          {item.hidenInMenu === true ? '显示' : '隐藏'}
        </Button>
      </>
    );
  };

  const renderTreeNode = (data: any) =>
    data.map((item: any) => ({
      key: item.key,
      title: renderNodeTitle(item),
      order: item.order,
      parent: item.parent,
      hidenInMenu: item.hidenInMenu,
      children: item.children && renderTreeNode(item.children),
    }));

  return (
    <>
      {editedItem && (
        <UpdateForm
          key={editedItem.id}
          open={open}
          setOpen={setOpen}
          menuTree={menuTree}
          roleItems={roleItems}
          menuItem={editedItem}
          refreshMenuTree={refreshMenuTree}
        />
      )}

      {menuTree.length > 0 && (
        <Tree
          defaultExpandAll={true}
          draggable
          blockNode
          onDrop={onDrop}
          treeData={renderTreeNode(menuTree)}
        />
      )}
    </>
  );
};

export default MenuList;
