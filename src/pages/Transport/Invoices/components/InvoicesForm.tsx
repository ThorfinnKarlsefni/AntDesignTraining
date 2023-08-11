import {
  BankOutlined,
  DollarOutlined,
  NodeIndexOutlined,
  ShoppingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import {
  DrawerForm,
  ProForm,
  ProFormDigit,
  ProFormFieldSet,
  ProFormMoney,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { App, InputNumber, message, Space } from 'antd';
import { InvoiceItem } from '../data';
import { submitInvoice } from '../service';

interface InvoicesProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const InvoicesForm: React.FC<InvoicesProps> = (props) => {
  const renderContent = () => {
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
          <ProFormDigit
            name="shipperPhone"
            label="发货电话"
            fieldProps={{ type: 'number', controls: false }}
            transform={(value) => {
              return {
                shipperPhone: String(value),
              };
            }}
            rules={[
              { required: true, message: '请填写发货人电话' },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            name="consigneeName"
            width="xs"
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
        <ProForm.Group>
          <ProFormSelect
            name="toStataion"
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
                style={{ width: 70 }}
                min={1}
                name="volume"
                placeholder="方"
              />
              <InputNumber
                style={{ width: 70 }}
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
          <ProFormMoney
            width="xs"
            addonBefore={<DollarOutlined />}
            min={1}
            name="insuranceFee"
            label="保费"
          />
          <ProFormMoney width="xs" label="货物价值" name="cargoValue" min={1} tooltip="test" />
        </ProForm.Group>
        <ProForm.Group>
          {/* cash on delivery collection */}
          <ProFormMoney
            width="xs"
            name="FreightFee"
            label="运费"
            rules={[{ required: true, message: '请输入运费' }]}
            addonBefore={<DollarOutlined />}
            min={1}
          />
          <ProFormMoney
            width="xs"
            name="codcFee"
            label="代收款"
            rules={[{ required: true, message: '请输入代收款' }]}
            min={1}
          />
          <ProFormMoney width="xs" name="backFreightFee" label="后程运费" min={1} />
          <ProFormMoney width="xs" name="deliveryFee" label="送货费" min={1} />
          <ProFormMoney width="xs" name="notificationFee" label="通知费" min={1} />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormRadio.Group
            name="PayMethod"
            label="付款方式"
            fieldProps={{ defaultValue: '现付' }}
            options={['现付', '到付', '回付']}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect addonBefore={<BankOutlined />} name="BankName" label="银行名称" />
          <ProFormText name="bankCard" label="银行卡" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect addonBefore={<UsergroupAddOutlined />} name="Creator" label="业务员" />
          <ProFormSelect name="bargainer" label="划价员" />
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

  const handelSubmit = async (values: InvoiceItem) => {
    try {
      await submitInvoice(values);
      message.success('开票成功!');
      return true;
    } catch (error: any) {
      message.error(error.response.data);
      return false;
    }
  };

  return (
    <>
      <App>
        <DrawerForm
          title="收货开票"
          width={850}
          onOpenChange={props.onOpenChange}
          open={props.open}
          onFinish={handelSubmit}
        >
          {renderContent()}
        </DrawerForm>
      </App>
    </>
  );
};
export default InvoicesForm;
