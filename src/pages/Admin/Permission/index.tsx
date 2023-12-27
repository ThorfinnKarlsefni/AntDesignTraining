import { ProCard } from '@ant-design/pro-components';
import { App, Tree } from 'antd';
import { useEffect, useState } from 'react';
import CreateForm from './component/CreateForm';
import RenderNodeTitle from './component/RenderNodeTitle';
import { getPermissionList } from './services';

const Permission = () => {
  const [permissionTree, setPermissionTree] = useState<PermissionItem[]>([]);

  const fetchPermission = async () => {
    const tree = await getPermissionList();
    setPermissionTree(tree);
  };

  const onDrop = async () => {};

  const renderTreeNode = (data: any) => {
    return data.map((item: PermissionItem) => ({
      key: item.id,
      title: <RenderNodeTitle permissionItem={item} />,
      children: item.children && renderTreeNode(item.children),
      parent: item.parentId,
    }));
  };

  useEffect(() => {
    fetchPermission();
  }, []);

  return (
    <>
      <App>
        <ProCard title={'权限列表'} extra={[<CreateForm key={'createForm'} />]}>
          <ProCard>
            {permissionTree.length > 0 && (
              <Tree
                defaultExpandAll={true}
                draggable
                blockNode
                onDrop={onDrop}
                treeData={renderTreeNode(permissionTree)}
              />
            )}
          </ProCard>
        </ProCard>
      </App>
    </>
  );
};

export default Permission;
