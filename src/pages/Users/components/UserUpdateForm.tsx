import { Form, Input, Modal, Select } from 'antd';
import { useState } from 'react';

interface UpdateFormComponentProps {
  title: string;
  user: API.CurrentUser;
  roleList: API.Role[];
}

const UserUpdateForm: React.FC<UpdateFormComponentProps> = (props) => {
  const [modalVisbile, setModalVisible] = useState<boolean>(false);

  const handleModalOpen = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

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

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const { Option } = Select;
  const [form] = Form.useForm();
  const onOk = (values: any) => {};

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <a key={props.user.id} onClick={handleModalOpen}>
        编辑
      </a>
      <Modal title={props.title} open={modalVisbile} onCancel={handleCloseModal} onOk={onOk}>
        <Form
          {...formItemLayout}
          form={form}
          initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
          style={{ maxWidth: 600, paddingTop: 20 }}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="用户名"
            initialValue={props.user.username}
            tooltip="登录账户"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="phone"
            label="电话"
            rules={[{ message: 'Please input your phone number!' }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              {
                type: 'email',
                message: '邮箱验证错误!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="role" label="角色">
            <Select
              placeholder="请输入角色角色"
              mode="multiple"
              options={props.roleList.map((role) => ({ lable: role.name, value: role.name }))}
            ></Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserUpdateForm;
