import { DownOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Modal, Select, Space, Table, TableColumnsType } from 'antd';
import { useState } from 'react';

const items = [
  { key: '1', label: 'Action 1' },
  { key: '2', label: 'Action 2' },
];
type CityName = keyof typeof cityData;

const provinceData = ['Zhejiang', 'Jiangsu'];

const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};
const columns: TableColumnsType<transitStationDataType> = [
  { title: '到站点', dataIndex: 'toStation', key: 'toStation' },
  { title: '起步价', dataIndex: 'platform', key: 'platform' },
  { title: '状态', dataIndex: 'version', key: 'version' },
  { title: '日期', dataIndex: 'createdAt', key: 'createdAt' },
  { title: '操作', key: 'operation', render: () => <a>Publish</a> },
];

const expandedRowRender = () => {
  const columns: TableColumnsType<toStationDataType> = [
    { title: '中转点', dataIndex: 'date', key: 'date' },
    { title: '', dataIndex: 'name', key: 'name' },
    {
      title: '状态',
      key: 'state',
      render: () => <Badge status="success" text="Finished" />,
    },
    { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <Space size="middle">
          <a>Pause</a>
          <a>Stop</a>
          <Dropdown menu={{ items }}>
            <a>
              More <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: 'Upgraded: 56',
    });
  }
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

const Station: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cities, setCities] = useState(cityData[provinceData[0] as CityName]);
  // eslint-disable-next-line
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0] as CityName][0]);

  //   const { Option } = Select;

  const handleAdd = async () => {
    // const ToStationList = await getToStation();
    setModalVisible(true);
  };

  const onCancel = () => {
    setModalVisible(false);
  };

  const handleProvinceChange = (value: CityName) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };

  const onSecondCityChange = (value: CityName) => {
    setSecondCity(value);
  };

  return (
    <>
      <div>
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          新建
        </Button>
        <Modal title="新建站点" open={modalVisible} onCancel={onCancel}>
          <Select
            style={{ width: 120 }}
            onChange={handleProvinceChange}
            options={provinceData.map((province) => ({ label: province, value: province }))}
          />
          <Select
            style={{ width: 120 }}
            onChange={onSecondCityChange}
            options={cities.map((city) => ({ label: city, value: city }))}
          />
        </Modal>
        <Table
          columns={columns}
          expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
          // dataSource={data}
        />
      </div>
    </>
  );
};

export default Station;
