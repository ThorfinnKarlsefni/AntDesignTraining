import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import { addPermission, getMenuPathList } from '../services';

const methodData = { 1: 'GET', 2: 'POST', 3: 'PUT', 4: 'DELETE' };

const onFinish = async (item: PermissionItem) => {
  await addPermission(item);
  message.success('提交成功');
  return true;
};

const CreateForm = () => {
  const [form] = Form.useForm();
  return (
    <>
      <ModalForm<PermissionItem>
        title="新建权限"
        form={form}
        autoFocusFirstInput
        submitTimeout={2000}
        trigger={<Button type="primary">新建</Button>}
        layout="horizontal"
        width={600}
        labelCol={{ span: 7 }}
        modalProps={{
          destroyOnClose: true,
        }}
        onFinish={onFinish}
      >
        <ProFormTreeSelect label="父级" name="parentId" width="md" placeholder="父级" />
        <ProFormText label="标识" name="name" width="md" placeholder="请输入标识" />
        <ProFormSelect
          label="HTTP方法"
          name="httpMethod"
          width="md"
          valueEnum={methodData}
          fieldProps={{ mode: 'multiple' }}
          placeholder="输入http方法"
        />
        <ProFormSelect
          label="HTTP路径"
          name="httpPath"
          width="md"
          placeholder="输入http路径"
          request={async () => {
            return await getMenuPathList();
          }}
        />
      </ModalForm>
    </>
  );
};

export default CreateForm;
