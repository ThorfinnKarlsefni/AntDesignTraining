import { App } from 'antd';
import React from 'react';

interface DeleteButtonProps {
  title: string;
  onConfirm: () => void;
  buttonText: string;
  content: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ title, onConfirm, buttonText, content }) => {
  const { modal } = App.useApp();

  const showDeleteConfirm = () => {
    modal.confirm({
      title,
      content: content,
      okText: 'Ok',
      cancelText: 'No',
    });
  };

  return (
    <a target="_blank" rel="noopener noreferrer" onClick={showDeleteConfirm}>
      {buttonText}
    </a>
  );
};

export default DeleteButton;
