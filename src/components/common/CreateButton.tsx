import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { CanAccess } from 'ra-core';
import { ActionButton } from '../styles/ActionButtons';

interface CreateButtonProps {
  resource: string;
  label?: string;
  className?: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({ 
  resource, 
  label = `Add ${resource.charAt(0).toUpperCase() + resource.slice(1, -1)}`,
  className 
}) => {
  const navigate = useNavigate();

  return (
    <CanAccess action="create" resource={resource}>
      <ActionButton>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className={className}
        onClick={() => navigate(`/${resource}/create`)}
      >
        {label}
      </Button>
      </ActionButton>
    </CanAccess>
  );
};

export default CreateButton;