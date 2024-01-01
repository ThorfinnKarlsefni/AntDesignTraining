import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useState } from 'react';
import { getMenuPathList, updatePermission } from '../services';
interface UpdateFormProps {
  PermissionItem: PermissionItem;
  IsVisibility: boolean;
  SetIsVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateForm: React.FC<UpdateFormProps> = ({
  PermissionItem,
  IsVisibility,
  SetIsVisibility,
}) => {
  const methodData = { GET: '查看', POST: '新增', PUT: '更新', DELETE: '删除' };
  const [form] = Form.useForm();

  const [open] = useState(IsVisibility);

  const onFinish = async (params: PermissionItem) => {
    await updatePermission(PermissionItem.id, params);
    message.success('更新成功');
    SetIsVisibility(false);
    return true;
  };

  return (
    <>
      <ModalForm<PermissionItem>
        title="修改权限"
        open={open}
        form={form}
        layout="horizontal"
        width={600}
        autoFocusFirstInput
        submitTimeout={2000}
        labelCol={{ span: 4 }}
        onFinish={onFinish}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {
            SetIsVisibility(false);
          },
        }}
      >
        <ProFormTreeSelect
          label="父级"
          name="parentId"
          width="md"
          placeholder="父级"
          initialValue={PermissionItem.parentId !== 0 ? PermissionItem.parentId : undefined}
        />
        <ProFormText
          label="标识"
          name="name"
          width="md"
          initialValue={PermissionItem.name}
          placeholder="请输入标识"
        />
        <ProFormSelect
          label="HTTP方法"
          name="httpMethod"
          width="md"
          mode="multiple"
          initialValue={
            PermissionItem.httpMethod.length !== 0
              ? PermissionItem.httpMethod.split(',')
              : undefined
          }
          valueEnum={methodData}
          placeholder="输入http方法"
        />
        <ProFormSelect
          label="HTTP路径"
          name="httpPath"
          width="md"
          placeholder="输入http路径"
          mode="multiple"
          initialValue={
            PermissionItem.httpPath.length !== 0 ? PermissionItem.httpPath.split(',') : undefined
          }
          fieldProps={{
            fieldNames: {
              label: 'name',
              value: 'path',
            },
          }}
          rules={[
            {
              type: 'array',
              max: 4,
              message: '最多只能选择4个路径',
            },
          ]}
          request={async () => {
            return await getMenuPathList();
          }}
        />
      </ModalForm>
    </>
  );
};

export default UpdateForm;
