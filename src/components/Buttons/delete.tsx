import { Modal } from 'antd';

const { confirm } = Modal;

interface DeleteButtonProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ title, onConfirm, onCancel }) => {
  const showDeleteConfirm = () => {
    confirm({
      title,
      icon: null,
      content: '确定要删除吗?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: onConfirm,
      onCancel,
    });
  };

  return (
    <a target="_blank" rel="noopener noreferrer" key="view" onClick={showDeleteConfirm}>
      删除
    </a>
  );
};

export default DeleteButton;
