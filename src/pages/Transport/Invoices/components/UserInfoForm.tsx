import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { ProForm, ProFormDigit, ProFormFieldSet, ProFormText } from '@ant-design/pro-components';
import { AutoComplete } from 'antd';
import { useState } from 'react';
import { getShipperInfo } from '../service';

const renderItem = (title: string, count: string) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  ),
});

const UserInfoForm: React.FC = () => {
  const [shipper, setShipper] = useState<{ value: string; label: React.JSX.Element }[]>([
    renderItem('暂无数据', 'NULL'),
  ]);

  const options = [
    {
      label: 'Shipper',
      options: shipper,
    },
  ];

  const handelShipperPhone = async (phone: string) => {
    if (phone.length > 4) {
      const res = await getShipperInfo(phone);
      console.log(res);
      const newShipeer = res.map((item: any) => renderItem(item.shipperName, item.shipperPhone));
      setShipper(newShipeer);
    }
  };

  return (
    <>
      <ProForm.Group>
        <ProFormText
          name="shipperName"
          width="xs"
          label="发货人"
          addonBefore={<UserOutlined />}
          rules={[{ required: true, message: '请填写发货人' }]}
        ></ProFormText>
        <ProFormFieldSet label="发货电话">
          <AutoComplete
            style={{ width: 230 }}
            placeholder={'请输入手机号'}
            onSearch={handelShipperPhone}
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
