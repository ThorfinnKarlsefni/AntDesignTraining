import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Badge, Button } from 'antd';
import { useState } from 'react';
import InvoicesForm from './components/InvoicesForm';
import { InvoicesItem } from './data';

const columns: ProColumns<InvoicesItem>[] = [
  {
    key: 'waybillId',
    title: '运单号',
    dataIndex: 'waybillId',
    align: 'center',
  },
  {
    key: 'toStation',
    title: '到站',
    dataIndex: 'toStation',
    align: 'center',
  },
  {
    key: 'transitStation',
    title: '中转',
    dataIndex: 'transitStation',
    align: 'center',
  },
  {
    key: 'cargoName',
    title: '货名',
    dataIndex: 'cargoName',
    align: 'center',
  },
  {
    key: 'cargoId',
    title: '货号',
    dataIndex: 'cargoId',
    align: 'center',
  },
  {
    key: 'shipperName',
    title: '发货人',
    dataIndex: 'shipperName',
    align: 'center',
  },
  {
    key: 'shipperPhone',
    title: '发货电话',
    dataIndex: 'shipperPhone',
    align: 'center',
  },
  {
    key: 'deliveryName',
    title: '收货人',
    dataIndex: 'deliveryName',
    align: 'center',
  },
  {
    key: 'deliveryPhone',
    title: '收货电话',
    dataIndex: 'deliveryPhone',
    align: 'center',
  },
  {
    key: 'quantity',
    title: '数量',
    dataIndex: 'quantity',
    align: 'center',
  },
  {
    key: 'dimension',
    title: '体积/重量',
    dataIndex: 'dimension',
    align: 'center',
  },
  {
    key: 'freightFee',
    title: '运费',
    dataIndex: 'freightFee',
    align: 'center',
  },
  {
    key: 'backFreightFee',
    title: '后程运费',
    dataIndex: 'backFreightFee',
    align: 'center',
  },
  {
    key: 'agencyFee',
    title: '代收款',
    dataIndex: 'agencyFee',
    align: 'center',
  },
  {
    key: 'deliveryFee',
    title: '送货费',
    dataIndex: 'deliveryFee',
    align: 'center',
  },
  {
    key: 'infoFee',
    title: '信息费',
    dataIndex: 'infoFee',
    align: 'center',
  },
  {
    key: 'refundFee',
    title: '返款费',
    dataIndex: 'refundFee',
    align: 'center',
  },
  {
    key: 'remark',
    title: '备注',
    dataIndex: 'remark',
    align: 'center',
  },
];

const renderBadge = (count: number, active = false) => {
  return (
    <Badge
      count={count}
      style={{
        marginBlockStart: -2,
        marginInlineStart: 4,
        color: active ? '#1890FF' : '#999',
        backgroundColor: active ? '#E6F7FF' : '#eee',
      }}
    />
  );
};

const Invoices: React.FC = () => {
  const [activeKey] = useState<React.Key>('today');
  const [drawerVisit, setDrawerVisit] = useState(false);
  return (
    <>
      <ProTable<InvoicesItem>
        columns={columns}
        search={false}
        pagination={{ showQuickJumper: true }}
        tableStyle={{ textAlign: 'center' }}
        toolbar={{
          menu: {
            type: 'tab',
            // activeKey:
            items: [
              {
                key: 'today',
                label: <span>今天{renderBadge(82, activeKey === 'today')}</span>,
              },
              {
                key: 'yesterday',
                label: <span>昨天{renderBadge(88, activeKey === 'day')}</span>,
              },
              {
                key: 'dayBeforeYesterday',
                label: <span>昨天{renderBadge(9, activeKey === 'dayBeforeYesterday')}</span>,
              },
            ],
          },
          actions: [
            <Button
              key="invoicesForm"
              type="primary"
              onClick={() => {
                setDrawerVisit(true);
              }}
            >
              <InvoicesForm onOpenChange={setDrawerVisit} open={drawerVisit} />
              收货开票
            </Button>,
          ],
        }}
      />
    </>
  );
};

export default Invoices;
