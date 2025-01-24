import React from 'react';
import { Button, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { CanAccess } from 'ra-core';
import { Identifier } from 'ra-core';

interface ViewButtonProps {
  resource: string;
  recordId: Identifier;
  label?: string;
}

const ViewButton: React.FC<ViewButtonProps> = ({ 
  resource, 
  recordId,
  label = 'View'
}) => {
  const navigate = useNavigate();

  return (
    <CanAccess action="show" resource={resource}>
      <Tooltip title={label}>
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/${resource}/${recordId}/show`)}
        />
      </Tooltip>
    </CanAccess>
  );
};

export default ViewButton;