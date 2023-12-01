import { App } from 'antd';
import React from 'react';

interface DeleteButtonProps {
  title: string;
  onOk: () => void;
  buttonText: string;
  content: string;
  color?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ title, buttonText, content, onOk }) => {
  const { modal } = App.useApp();

  const showDeleteConfirm = async () => {
    modal.confirm({
      title,
      content: content,
      okText: 'Ok',
      cancelText: 'No',
      onOk: onOk,
    });
  };

  return (
    <a target="_blank" rel="noopener noreferrer" onClick={showDeleteConfirm}>
      {buttonText}
    </a>
  );
};

export default DeleteButton;
