import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { useSider } from '../contexts/SiderContext';
import { useTheme } from '../contexts/ThemeContext';
import { useCanAccess } from 'ra-core';

const { Sider } = Layout;



const menuItems = [
  {
    key: '1',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
      </svg>
    ),
    label: 'Dashboard',
    path: '/'
    
  },
  {
    key: '2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2V7h-4v2h2z"/>
      </svg>
    ),
    label: 'Deals',
    path: '/deals'
  },
  {
    key: '3',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    label: 'Contacts',
    path: '/contacts'
  },
  {
    key: '4',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
      </svg>
    ),
    label: 'Companies',
    path: '/companies'
  },
  {
    key: '5',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"/>
      </svg>
    ),
    label: 'Quotes',
    path: '/quotes'
  }
];

const AppSider: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { collapsed } = useSider();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sider 
      collapsed={collapsed}
      style={{
        background: isDarkMode ? '#1f2937' : '#fff',
        boxShadow: isDarkMode ? 
          '2px 0 8px 0 rgba(0,0,0,.25)' : 
          '2px 0 8px 0 rgba(29,35,41,.05)',
        zIndex: 10
      }}
    >
      <div style={{
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #f0f0f0',
        overflow: 'hidden'
      }}>
        <div style={{
          color: '#1890ff',
          fontWeight: 'bold',
          fontSize: collapsed ? '16px' : '24px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
          transition: 'all 0.3s',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {collapsed ? 'O' : 'OctoCRM'}
        </div>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ 
          background: 'transparent',
          borderRight: 0 
        }}
      items={menuItems.map(item => {
        const { isPending, error, canAccess } = useCanAccess({
          action: 'list',
          resource: item.label,
        });
        if (isPending || error || !canAccess) return null;
        return {
          ...item,
          style: {
            margin: '4px 0',
            color: isDarkMode ? '#f3f4f6' : undefined,
          },
          icon: React.cloneElement(item.icon as React.ReactElement, {
            style: { color: isDarkMode ? '#f3f4f6' : undefined }
          }),
          onClick: () => { navigate(item.path) }
        };
      })}
      />
    </Sider>
  );
};

export default AppSider;