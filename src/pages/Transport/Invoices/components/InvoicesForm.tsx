import {
  BankOutlined,
  DollarOutlined,
  InsuranceOutlined,
  NodeIndexOutlined,
  ShoppingOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import {
  DrawerForm,
  ProForm,
  ProFormDigit,
  ProFormFieldSet,
  ProFormItem,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { App, Form, InputNumber, message, Select, Space } from 'antd';
import React from 'react';
import { invoicesFeeParams, InvoicesItem, InvoicesProps } from '../data';
import { addInvoice } from '../service';

import UserInfoForm from './UserInfoForm';

const paymentMethods = [
  { value: 1, label: '现付' },
  { value: 2, label: '代付' },
  { value: 3, label: '回付' },
  { value: 4, label: '扣付', disabled: true },
];

const paidMethods = [
  { value: 1, label: '已支' },
  { value: 2, label: '未支' },
];
const paymentSelect = (
  <Select style={{ width: 80 }} defaultValue={'现付'} options={paymentMethods} />
);

const paidSelect = <Select style={{ width: 80 }} defaultValue={'未支'} options={paidMethods} />;

const FeeForm = (data: invoicesFeeParams) => (
  <>
    <ProFormItem
      name={data.name}
      label={data.label}
      rules={data.rules}
      addonBefore={data.addonBefore}
    >
      <InputNumber
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={(value) => {
          const parsedValue = value!.replace(/,/g, '');
          const floatValue = parseFloat(parsedValue);
          return isNaN(floatValue) ? '' : Math.max(floatValue, 1);
        }}
        style={data.style}
        controls={false}
        addonBefore={false}
        addonAfter={data.addonAfter}
      />
    </ProFormItem>
  </>
);

const InvoicesForm: React.FC<InvoicesProps> = (props) => {
  const [form] = Form.useForm();
  const handelSubmit = async (props: InvoicesItem) => {
    await addInvoice(props);
    message.success('开票成功!');
    return true;
  };

  const renderContent = () => {
    return (
      <>
        <UserInfoForm form={form} />
        <ProForm.Group>
          <ProFormSelect
            name="toStation"
            label="到站"
            addonBefore={<NodeIndexOutlined />}
            options={[
              {
                value: '123123',
                label: '贵阳',
              },
              {
                value: '12313',
                label: '济南',
              },
            ]}
            rules={[{ required: true, message: '请填写到站信息' }]}
          />
          <ProFormSelect
            name="transitStation"
            label="中转点"
            options={[
              {
                value: '123213',
                label: '六盘水',
              },
              {
                value: '123123',
                label: '历下区',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="address"
            label="送货地址"
            rules={[{ required: true, message: '请填写收货地址' }]}
          />
        </ProForm.Group>
        {/* 货物信息 */}
        <ProForm.Group>
          <ProFormText
            width="xs"
            addonBefore={<ShoppingOutlined />}
            name="cargoName"
            label="货物名称"
            rules={[{ required: true, message: '请填写货物名称' }]}
          />
          <ProFormText width="xs" name="CargoId" label="货物编号" />
          <ProFormDigit
            width={80}
            label="件数"
            name="quantity"
            fieldProps={{ type: 'number' }}
            min={1}
            rules={[{ required: true, message: '请填写件数' }]}
          />
          <ProFormFieldSet label="体积/重量">
            <Space.Compact>
              <InputNumber
                type="number"
                style={{ width: 75 }}
                min={1}
                name="volume"
                placeholder="方"
              />
              <InputNumber
                style={{ width: 75 }}
                type="number"
                min={1}
                name="Weight"
                placeholder="公斤"
              />
            </Space.Compact>
          </ProFormFieldSet>
          <ProFormSelect name="packing" label="包装方式" />
        </ProForm.Group>

        <ProForm.Group>
          <FeeForm
            name="insuranceFee"
            label="保费"
            style={{ width: 105 }}
            addonBefore={<InsuranceOutlined />}
          />

          <FeeForm name="cargoValue" style={{ width: 105 }} label="货物价值" />
        </ProForm.Group>
        <ProForm.Group>
          <FeeForm
            name="FreightFee"
            label="运费"
            rules={[{ required: true, message: '请输入运费' }]}
            style={{ width: 150 }}
            addonBefore={<DollarOutlined />}
            addonAfter={paymentSelect}
          />
          <FeeForm
            name="agencyFee"
            label="代收款"
            style={{ width: 150 }}
            addonAfter={paymentSelect}
          />
          <FeeForm
            name="backFreightFee"
            label="后程运费"
            style={{ width: 150 }}
            addonAfter={paymentSelect}
          />
          <FeeForm
            name="deliveryFee"
            label="送货费"
            style={{ width: 150 }}
            addonAfter={paidSelect}
          />
          <FeeForm
            name="notificationFee"
            label="通知费"
            style={{ width: 150 }}
            addonAfter={paidSelect}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect addonBefore={<BankOutlined />} name="BankName" label="银行名称" />
          <ProFormText name="bankCard" label="银行卡" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect addonBefore={<UsergroupAddOutlined />} name="bargainer" label="划价员" />
          <ProFormSelect name="receiptType" label="回单类型" />
        </ProForm.Group>
        <ProFormRadio.Group
          name="deliveryMethod"
          label="交货方式"
          fieldProps={{ defaultValue: '送货' }}
          options={['送货', '等通知放货', '大车直送', '另算']}
        />
        <ProFormText tooltip="写点什么吧" width="lg" name="remarks" label="备注" />
      </>
    );
  };

  return (
    <>
      <App>
        <DrawerForm
          title="收货开票"
          width={1000}
          onOpenChange={props.onOpenChange}
          open={props.open}
          onFinish={handelSubmit}
          form={form}
        >
          {renderContent()}
        </DrawerForm>
      </App>
    </>
  );
};
export default InvoicesForm;
