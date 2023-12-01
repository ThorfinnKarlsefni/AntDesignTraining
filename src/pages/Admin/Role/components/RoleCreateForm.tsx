import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { App, Button, Form, message } from 'antd';
import { addRole } from '../services';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const RoleCreateForm = ({ refreshRoleList }: { refreshRoleList: () => void }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (params: Role) => {
    await addRole(params);
    message.success('创建成功');
    refreshRoleList();
    return true;
  };

  return (
    <App>
      <ModalForm
        {...formItemLayout}
        title="新建角色"
        trigger={<Button type="primary">新建</Button>}
        form={form}
        autoFocusFirstInput
        submitTimeout={2000}
        onFinish={handleSubmit}
        width={500}
        layout="horizontal"
        modalProps={{ destroyOnClose: true }}
      >
        <ProFormText
          width="md"
          name="roleName"
          label="名称"
          placeholder="请输入角色名称"
          rules={[{ required: true, message: '请输入名称' }]}
        />
      </ModalForm>
    </App>
  );
};

export default RoleCreateForm;
