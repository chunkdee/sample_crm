import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { CanAccess } from 'ra-core';

interface CreateButtonProps {
  resource: string;
  label?: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({ 
  resource, 
  label = `Add ${resource.charAt(0).toUpperCase() + resource.slice(1, -1)}` 
}) => {
  const navigate = useNavigate();

  return (
    <CanAccess action="create" resource={resource}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => navigate(`/${resource}/create`)}
      >
        {label}
      </Button>
    </CanAccess>
  );
};

export default CreateButton;