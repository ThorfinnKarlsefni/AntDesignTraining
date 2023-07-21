import { Modal } from 'antd';

const { confirm } = Modal;

interface DeleteButtonProps {
  title: string;
  onConfirm: () => void;
  buttonText: string;
  content: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ title, onConfirm, buttonText, content }) => {
  const showDeleteConfirm = () => {
    confirm({
      title,
      icon: null,
      content: content,
      okText: 'Yes',
      cancelText: 'No',
      onOk: onConfirm,
    });
  };

  return (
    <a target="_blank" rel="noopener noreferrer" key="view" onClick={showDeleteConfirm}>
      {buttonText}
    </a>
  );
};

export default DeleteButton;
