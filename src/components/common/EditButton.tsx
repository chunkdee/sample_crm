import React from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { CanAccess } from 'ra-core';
import { Identifier } from 'ra-core';
import { ActionButton } from '../styles/ActionButtons';

interface EditButtonProps {
  resource: string;
  recordId: Identifier;
  label?: string;
  className?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ 
  resource, 
  recordId,
  label = 'Edit',
  className
}) => {
  const navigate = useNavigate();

  return (
    <CanAccess action="edit" resource={resource}>
      <ActionButton>
      <Button
        type="text"
        icon={<EditOutlined />}
        className={className}
        onClick={() => navigate(`/${resource}/${recordId}/edit`)}
      />
      </ActionButton>
    </CanAccess>
  );
};

export default EditButton;