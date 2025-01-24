import React from 'react';
import { Layout, Avatar, Menu, Dropdown, Badge, Input, Space, Breadcrumb, Typography, Button, Switch, Tooltip } from 'antd';
import { 
  UserOutlined, 
  BellOutlined, 
  SearchOutlined, 
  SettingOutlined,
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
  MenuFoldOutlined, 
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useSider } from '../contexts/SiderContext';
import UserMenu from './UserMenu';

const { Header } = Layout;
const { Title, Text } = Typography;

const AppHeader: React.FC = () => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { collapsed, toggleCollapsed } = useSider();

  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <Header style={{ 
      padding: '0 24px', 
      background: isDarkMode ? '#1f2937' : '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 1px 4px rgba(0,21,41,.08)',
      zIndex: 1,
      height: '64px',
      borderBottom: `1px solid ${isDarkMode ? '#374151' : '#f0f0f0'}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
          style={{
            fontSize: '16px',
            width: 48,
            height: 48,
            color: isDarkMode ? '#f3f4f6' : undefined
          }}
        />
        <Title level={4} style={{ margin: 0, marginLeft: 12, color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>
          OctoCRM
        </Title>
      </div>

      <Space size={24}>
        <Badge count={5} offset={[-5, 5]}>
          <BellOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
        </Badge>

        <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            style={{ backgroundColor: isDarkMode ? '#177ddc' : undefined }}
          />
        </Tooltip>

        <UserMenu />
      </Space>
    </Header>
  );
};

export default AppHeader;