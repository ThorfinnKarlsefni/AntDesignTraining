import { ModalForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { message, Space } from 'antd';
import { useRef } from 'react';

interface ResetUpdateFormComponentProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const ResetUpdateFormComponent: React.FC<ResetUpdateFormComponentProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const restFormRef = useRef<ProFormInstance>();

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  return (
    <>
      <Space>
        <a onClick={handleOpenModal}>编辑</a>
      </Space>
      <ModalForm
        title="用户信息"
        formRef={restFormRef}
        open={modalVisible}
        onOpenChange={setModalVisible}
        submitter={{
          searchConfig: {
            resetText: '重置',
          },
          resetButtonProps: {
            onClick: () => {
              restFormRef.current?.resetFields();
            },
          },
        }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('提交成功');
          return true;
        }}
      >
        <ProFormText
          width="md"
          name="username"
          label="用户名"
          tooltip="最长为24位"
          placeholder="请输入名称"
        />
        <ProFormText name="role" label="角色" placeholder="角色名称" />
      </ModalForm>
    </>
  );
};

export default ResetUpdateFormComponent;
