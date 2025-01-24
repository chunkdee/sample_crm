import React from 'react';
import { Menu, Dropdown, Space, Avatar, Typography } from 'antd';
import { useLogout, useGetIdentity } from 'ra-core';
import { useNavigate } from 'react-router-dom';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const UserMenu: React.FC = () => {
  const logout = useLogout();
  const { data: identity } = useGetIdentity();
  const navigate = useNavigate();

  const menu = (
    <Menu
      items={[
        {
          key: 'profile',
          icon: <UserOutlined />,
          label: 'Profile',
          onClick: () => navigate('/profile')
        },
        {
          key: 'settings',
          icon: <SettingOutlined />,
          label: 'Settings',
          onClick: () => navigate('/settings')
        },
        {
          type: 'divider'
        },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: 'Logout',
          onClick: () => logout()
        }
      ]}
    />
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Space style={{ cursor: 'pointer' }}>
        <Avatar 
          size={32} 
          src={identity?.avatar}
          icon={!identity?.avatar && <UserOutlined />}
          style={{ backgroundColor: '#1890ff' }}
        />
        <Text strong>{identity?.fullName || 'User'}</Text>
      </Space>
    </Dropdown>
  );
};

export default UserMenu;