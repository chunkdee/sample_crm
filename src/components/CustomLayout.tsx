import React, { ReactNode } from 'react';
import { Layout, Typography } from 'antd';
import AppHeader from './Header';
import AppSider from './Sider';
import { SiderProvider } from '../contexts/SiderContext';

const { Content } = Layout;
const { Title } = Typography;

interface CustomLayoutProps {
  children: ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <SiderProvider>
      <Layout style={{ 
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>
        <AppSider />
        <Layout>
          <AppHeader />
          <Content style={{ 
            margin: '24px 16px', 
            padding: 24, 
            background: '#fff', 
            minHeight: 280 
          }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </SiderProvider>
  );
};

export default CustomLayout;