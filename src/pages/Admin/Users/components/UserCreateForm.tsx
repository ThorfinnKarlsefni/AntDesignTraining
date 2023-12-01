import { Button, Form, Input, Modal, Select } from 'antd';
import { useState } from 'react';
const { Option } = Select;

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

const UserCreateForm: React.FC = () => {
  const [form] = Form.useForm();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // eslint-disable-next-line
  const [roles, setRoles] = useState<Role[]>([]);

  const handleModalOpen = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  //   const fetchRoleList = async () => {
  //     try {
  //       const roles = await getRoleList();
  //       setRoles(roles);
  //     } catch (error) {}
  //   };

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
      <Button type="primary" key="primary" onClick={handleModalOpen}>
        新建
      </Button>
      <Modal title="新建员工" open={modalVisible} onCancel={handleCloseModal}>
        <Form
          {...formItemLayout}
          form={form}
          name="created-user"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="用户名"
            rules={[
              { required: true, message: '请输入用户名' },
              { max: 12, message: '字符不能超过12个' },
            ]}
          >
            <Input placeholder="请输入用户名" autoComplete="off" />
          </Form.Item>

          <Form.Item
            name="roles"
            label="角色"
            rules={[{ required: true, message: '角色必须选择' }]}
          >
            <Select />
          </Form.Item>

          <Form.Item name="phone" label="手机号">
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="roles"
            label="角色"
            rules={[
              {
                required: true,
                message: '请选择角色',
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="请选择角色"
              value={roles}
              //   onChange={setSelectedItems}
            />
          </Form.Item>

          <Form.Item
            name="company"
            label="公司"
            rules={[
              {
                required: true,
                message: '请选择公司',
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="请选择公司"
              //   value={selectItems}
              //   onChange={setSelectedItems}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UserCreateForm;
