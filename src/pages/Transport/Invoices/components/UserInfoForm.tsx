import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { ProForm, ProFormDigit, ProFormFieldSet, ProFormText } from '@ant-design/pro-components';
import { AutoComplete } from 'antd';
import { useState } from 'react';
import { getShipperInfo } from '../service';

const renderItem = (phone: string, user: string) => ({
  value: phone,
  user: user,
  element: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {phone}
      <span>
        <UserOutlined /> {user}
      </span>
    </div>
  ),
});

const UserInfoForm: React.FC = () => {
  const [shipper, setShipper] = useState<{ value: string; label: React.JSX.Element }[]>([]);
  const [shipperUserName, setShipperUserName] = useState('');
  const [form] = ProForm.useForm();

  const options = [
    {
      label: 'Shipper',
      options: shipper,
    },
  ];

  const handelShipperPhone = async (phone: string) => {
    if (phone.length > 2) {
      const res = await getShipperInfo(phone);
      const newShipeer = res.map((item: any) => renderItem(item.shipperPhone, item.shipperName));
      setShipper(newShipeer);
    }
  };

  const handelShipperName = async (user: string, option: any) => {
    setShipperUserName(option.user);
  };

  return (
    <>
      <ProForm.Group>
        <ProFormText
          name="shipperName"
          width="xs"
          label="发货人"
          addonBefore={<UserOutlined />}
          fieldProps={{
            value: shipperUserName,
            onChange: (e) => setShipperUserName(e.target.value),
          }}
          rules={[{ required: true, message: '请填写发货人' }]}
        />
        <ProFormFieldSet name="shipperPhone" label="发货电话">
          <AutoComplete
            style={{ width: 230 }}
            placeholder={'请输入手机号'}
            onSearch={handelShipperPhone}
            onSelect={handelShipperName}
            options={options}
          />
        </ProFormFieldSet>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="consigneeName"
          label="收货人"
          addonBefore={<UserSwitchOutlined />}
          rules={[{ required: true, message: '请填写收货人' }]}
        />
        <ProFormDigit
          name="consigneePhone"
          label="收货电话"
          transform={(value) => {
            return {
              consigneePhone: String(value),
            };
          }}
          fieldProps={{ type: 'number', controls: false }}
          rules={[
            { required: true, message: '请填写发货人电话' },
            {
              pattern: /^1\d{10}$/,
              message: '手机号格式错误',
            },
          ]}
        />
      </ProForm.Group>
    </>
  );
};

export default UserInfoForm;
