import { App, Button, Col, Row, Tag } from 'antd';
import { useState } from 'react';
import { deletePermission } from '../services';
import UpdateForm from './UpdateForm';

interface RenderNodeTitleProps {
  permissionItem: PermissionItem;
}

const RenderNodeTitle: React.FC<RenderNodeTitleProps> = ({ permissionItem }) => {
  const { modal, message } = App.useApp();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const tags = (data: string, color: string) => {
    const itemArr = data.split(',');
    return itemArr.length > 1
      ? itemArr.map((item, index) => (
          <Tag key={index} color={color}>
            {item.trim()}
          </Tag>
        ))
      : null;
  };

  const showDeleteConfirm = async (id: string) => {
    modal.confirm({
      title: '删除权限',
      content: '删除无法恢复，您确认删除吗?',
      onOk: async () => {
        await deletePermission(id);
        message.success('删除成功');
        return true;
      },
      onCancel: async () => {
        message.info('取消删除');
      },
    });
  };

  const handleEditNode = async () => {
    setIsEditModalVisible(true);
  };

  return (
    <>
      <App>
        <Row gutter={16} align="middle" key={permissionItem.id}>
          <Col span={4}>{permissionItem.name}</Col>
          <Col span={4}>{tags(permissionItem.httpMethod, 'red')}</Col>
          <Col span={10}>{tags(permissionItem.httpPath, 'blue')}</Col>

          <Col style={{ marginLeft: 'auto' }}>
            <Button type="link" onClick={handleEditNode}>
              编辑
            </Button>
            <Button type="link" onClick={() => showDeleteConfirm(permissionItem.id)}>
              删除
            </Button>
          </Col>
        </Row>
        {isEditModalVisible && (
          <UpdateForm
            PermissionItem={permissionItem}
            IsVisibility={isEditModalVisible}
            SetIsVisibility={setIsEditModalVisible}
          />
        )}
      </App>
    </>
  );
};

export default RenderNodeTitle;
