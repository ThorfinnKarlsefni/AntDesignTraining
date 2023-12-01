import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { ProForm, ProFormFieldSet, ProFormText } from '@ant-design/pro-components';
import { AutoComplete } from 'antd';
import React, { useState } from 'react';
import { UserInfoFormProps } from '../data';
import { getConsigneeList, getShipperList } from '../service';

const renderItem = (phone: string, user: string) => ({
  value: phone,
  user: user,
  label: (
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
const UserInfoForm: React.FC<UserInfoFormProps> = ({ form }) => {
  //shipper
  const [shipper, setShipper] = useState<
    { phone: string; user: string; label: React.JSX.Element }[]
  >([]);

  //consignee
  const [consignee, setConsignee] = useState<
    { phone: string; user: string; label: React.JSX.Element }[]
  >([]);

  const shipperOptions = [
    {
      label: '发货人',
      options: shipper,
    },
  ];

  const consigneeOptions = [
    {
      label: '收货人',
      options: consignee,
    },
  ];

  const handleShipperPhone = async (phone: string) => {
    let searchTimer;
    clearTimeout(searchTimer);

    searchTimer = setTimeout(async () => {
      if (phone.length > 2 && /^\d+$/.test(phone)) {
        const res = await getShipperList(phone);
        const newShipper = res.map((item: any) => renderItem(item.shipperPhone, item.shipperName));
        setShipper(newShipper);
      }
    }, 500);
  };

  const handleShipperName = async (phone: string, option: any) => {
    form.setFieldsValue({ shipperName: option.user });
  };

  const handleConsigneePhone = async (phone: string) => {
    let searchTimer;
    clearTimeout(searchTimer);

    searchTimer = setTimeout(async () => {
      if (phone.length > 2 && /^\d+$/.test(phone)) {
        const res = await getConsigneeList(phone);
        const Consignees = res.map((item: any) => renderItem(item.phone, item.name));
        setConsignee(Consignees);
      }
    }, 500);
  };

  const handleConsigneeName = async (phone: string, option: any) => {
    form.setFieldsValue({ consigneeName: option.user });
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
        />
        <ProFormFieldSet
          name="shipperPhone"
          label="发货电话"
          rules={[
            { required: true, message: '请填写发货电话' },
            {
              pattern: /^1\d{10}$/,
              message: '手机号格式错误',
            },
          ]}
        >
          <AutoComplete
            style={{ width: 230 }}
            placeholder={'请输入手机号'}
            onSearch={handleShipperPhone}
            onSelect={handleShipperName}
            options={shipperOptions}
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
        <ProFormFieldSet
          name="consigneePhone"
          label="送货电话"
          rules={[
            { required: true, message: '请填写送货电话' },
            {
              pattern: /^1\d{10}$/,
              message: '手机号格式错误',
            },
          ]}
        >
          <AutoComplete
            style={{ width: 230 }}
            placeholder={'请输入手机号'}
            onSearch={handleConsigneePhone}
            onSelect={handleConsigneeName}
            options={consigneeOptions}
          />
        </ProFormFieldSet>
      </ProForm.Group>
    </>
  );
};

export default UserInfoForm;
