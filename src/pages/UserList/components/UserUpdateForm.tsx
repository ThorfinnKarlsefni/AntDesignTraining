import { Form, Input, Modal, Select } from 'antd';
import { useState } from 'react';

export type UpdateFormComponentProps = {
  title: string;
  user: API.CurrentUser;
};

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
      sm: { span: 6 },
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
        span: 24,
        offset: 0,
      },
    },
  };

  const { Option } = Select;
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

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
      {modalVisbile && (
        <Modal title={props.title} open={modalVisbile} onCancel={handleCloseModal}>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
            style={{ maxWidth: 600, paddingTop: 20 }}
            scrollToFirstError
          >
            <Form.Item
              name="nickname"
              label="用户名"
              tooltip="What do you want others to call you?"
              rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="电话"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  // required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="gender"
              label="角色"
              rules={[{ required: true, message: 'Please select gender!' }]}
            >
              <Select placeholder="select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="确认密码"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The new password that you entered do not match!'),
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default UserUpdateForm;
