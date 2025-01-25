import React, { useState } from 'react';
import { Button, Tooltip, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { CanAccess, useDelete, Identifier } from 'ra-core';

interface DeleteButtonProps {
  resource: string;
  recordId: Identifier;
  label?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ 
  resource, 
  recordId,
  label = 'Delete'
}) => {
  const [deleteOne] = useDelete();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteOne(resource, { id: recordId });
      message.success('Record deleted successfully');
    } catch (error) {
      message.error('Error deleting record');
    }
    setLoading(false);
  };

  return (
    <CanAccess action="delete" resource={resource}>
      <Popconfirm
        title="Are you sure you want to delete this record?"
        onConfirm={handleDelete}
        okText="Yes"
        cancelText="No"
        placement="left"
      >
        <Tooltip title={label}>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            loading={loading}
          />
        </Tooltip>
      </Popconfirm>
    </CanAccess>
  );
};

export default DeleteButton;