import { DrawerForm, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { InputNumber, message, Space } from 'antd';
import { useEffect } from 'react';

interface InvoicesProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const InvoicesForm: React.FC<InvoicesProps> = (props) => {
  const handelToStation = async () => {
    try {
      //   const response = await toStation{};
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handelToStation();
  }, []);

  return (
    <>
      <DrawerForm
        title="收货开票"
        onOpenChange={props.onOpenChange}
        open={props.open}
        onFinish={async () => {
          message.success('提交成功');
          return true;
        }}
      >
        <ProForm.Group>
          <Space>
            <ProFormSelect
              name="toStataion"
              label="到站"
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
              name="transitStation"
              label="中转点"
            />
            <ProFormText
              width="md"
              name="deliveryAddress"
              label="送货地址"
              rules={[{ required: true, message: '请填写收货地址' }]}
            />
          </Space>

          <Space style={{ width: '100%' }}>
            <ProFormText
              name="recipientName"
              label="收货人"
              rules={[{ required: true, message: '请填写收货人' }]}
            />
            <ProFormText
              name="recipientPhone"
              label="收货电话"
              rules={[{ required: true, message: '请输入收货电话' }]}
            />
          </Space>

          {/* 货物信息 */}
          <Space>
            <ProFormText
              width="xs"
              name="cargoName"
              label="货物名称"
              rules={[{ required: true, message: '请输入货物名称' }]}
            />
            <ProFormText name="cargoId" label="货物编号" />
          </Space>

          {/* 货物规格信息 */}
          <Space>
            <ProFormText label="件数">
              <InputNumber min={1} name="quantity" />
            </ProFormText>
            <ProFormText width="xs" label="体积/重量">
              <Space.Compact>
                <InputNumber min={1} name="volume" placeholder="方" />
                <InputNumber min={1} name="weight" placeholder="公斤" />
              </Space.Compact>
            </ProFormText>

            <ProFormSelect name="packMethod" label="包装方式" />

            <ProFormText label="保费">
              <InputNumber prefix="￥" name="insuranceFee" />
            </ProFormText>
            <ProFormText label="货物价值">
              <InputNumber min={1} prefix="￥" name="cargoValue" />
            </ProFormText>
          </Space>

          {/* cash on delivery collection */}
          <ProFormText width="sm" name="codcFee" label="代收款" />
          <ProFormText width="sm" name="freightFee" label="运费" />
          <ProFormText width="sm" name="backFreightFee" label="后程运费" />
          <ProFormText width="sm" name="deliveryFee" label="送货费" />
          <ProFormText width="sm" name="shipperName" label="发货人" />
          <ProFormText width="sm" name="shipperPhone" label="发货电话" />
          <ProFormText width="sm" name="bankName" label="银行名称" />
          <ProFormText width="sm" name="bankCard" label="银行卡" />
          <ProFormText width="sm" name="salesperson" label="业务员" />
          <ProFormText width="sm" name="notificationFee" label="通知费" />
          <ProFormText width="sm" name="receiptType" label="回单类型" />
          <ProFormText width="sm" name="remark" label="备注" />
        </ProForm.Group>
      </DrawerForm>
    </>
  );
};
export default InvoicesForm;
