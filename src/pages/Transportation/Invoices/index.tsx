import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Badge, Button } from 'antd';
import { useState } from 'react';
import InvoicesForm from './components/InvoicesForm';

interface TableListItem {
  //   id: number;
  waybillId: string;
  toStation: string;
  transitStation: string;
  cargoName: string;
  cargoId: string;
  quantity: number;
  dimension: string;
  //   cash on delivery collection
  codcFee: number;
  freightFee: number;
  backFreightFee: number;
  deliveryFee: number;
  refundFee: number;
  infoFee: number;
  shipperName: string;
  shipperPhone: string;
  deliveryName: string;
  deliverPhone: string;
  remark: string;
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '运单号',
    dataIndex: 'waybillId',
  },
  {
    title: '到站',
    dataIndex: 'toStation',
  },
  {
    title: '中转',
    dataIndex: 'transitStation',
  },
  {
    title: '货名',
    dataIndex: 'cargoName',
  },
  {
    title: '货号',
    dataIndex: 'cargoId',
  },
  {
    title: '发货人',
    dataIndex: 'shipperName',
  },
  {
    title: '发货电话',
    dataIndex: 'shipperPhone',
  },
  {
    title: '收货人',
    dataIndex: 'deliveryName',
  },
  {
    title: '收货电话',
    dataIndex: 'deliveryPhone',
  },
  {
    title: '件数',
    dataIndex: 'quantity',
  },
  {
    title: '体积/重量',
    dataIndex: 'dimension',
  },
  {
    title: '运费',
    dataIndex: 'freightFee',
  },
  {
    title: '后程运费',
    dataIndex: 'backFreightFee',
  },
  {
    title: '代收款',
    dataIndex: 'codcFee',
  },
  {
    title: '送货费',
    dataIndex: 'deliveryFee',
  },
  {
    title: '信息费',
    dataIndex: 'infoFee',
  },
  {
    title: '返款费',
    dataIndex: 'refundFee',
  },
  {
    title: '备注',
    dataIndex: 'remark',
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
  const [activeKey, setActiveKey] = useState<React.Key>('today');
  const [drawerVisit, setDrawerVisit] = useState(false);

  return (
    <>
      <ProTable<TableListItem>
        columns={columns}
        search={false}
        pagination={{ showQuickJumper: true }}
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
