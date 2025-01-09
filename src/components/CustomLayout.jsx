import React from 'react';
import { Layout } from 'antd';
import AppHeader from './Header';
import AppSider from './Sider';

const { Content } = Layout;

const CustomLayout = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSider />
            <Layout>
                <AppHeader />
                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default CustomLayout;
