import { ModalForm, ProColumns, ProTable } from '@ant-design/pro-components';
import CreateForm from './component/CreateForm';

const columns: ProColumns<PermissionItem>[] = [
  {
    key: 'name',
    title: '标识',
    dataIndex: 'name',
    align: 'center',
  },
  {
    key: 'httpMethod',
    title: '请求方法',
    dataIndex: 'httpMethod',
    align: 'center',
  },
  {
    key: 'httpPath',
    title: '请求路径',
    dataIndex: 'httpPath',
    align: 'center',
  },
  {
    key: 'createdAt',
    title: '创建时间',
    dataIndex: 'createdAt',
    align: 'center',
  },
];

const Permission = () => {
  //   const [modalVisible, setModalVisible] = useState(false);

  //   const handleVisible = () => {
  //     setModalVisible(true);
  //   };

  //   const dataSource = async () => {};
  return (
    <>
      <ModalForm title="新建权限"></ModalForm>
      <ProTable<PermissionItem>
        columns={columns}
        headerTitle="权限列表"
        search={false}
        toolBarRender={() => [<CreateForm key="createPermissionForm " />]}
      ></ProTable>
    </>
  );
};

export default Permission;
