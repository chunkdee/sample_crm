import React from 'react';
import { Button, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { CanAccess } from 'ra-core';
import { Identifier } from 'ra-core';
import { ActionButton } from '../styles/ActionButtons';

interface ViewButtonProps {
  resource: string;
  recordId: Identifier;
  label?: string;
  className?: string;
}

const ViewButton: React.FC<ViewButtonProps> = ({ 
  resource, 
  recordId,
  label = 'View',
  className
}) => {
  const navigate = useNavigate();

  return (
    <CanAccess action="show" resource={resource}>
      <Tooltip title={label}>
        <ActionButton>
        <Button
          type="text"
          icon={<EyeOutlined />}
          className={className}
          onClick={() => navigate(`/${resource}/${recordId}/show`)}
        />
        </ActionButton>
      </Tooltip>
    </CanAccess>
  );
};

export default ViewButton;