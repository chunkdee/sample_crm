import React from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { CanAccess } from 'ra-core';
import { Identifier } from 'ra-core';

interface EditButtonProps {
  resource: string;
  recordId: Identifier;
  label?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ 
  resource, 
  recordId,
  label = 'Edit'
}) => {
  const navigate = useNavigate();

  return (
    <CanAccess action="edit" resource={resource}>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => navigate(`/${resource}/${recordId}/edit`)}
      >
        {label}
      </Button>
    </CanAccess>
  );
};

export default EditButton;