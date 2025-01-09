import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import { CoreAdmin, Resource } from 'ra-core';
import { ListGuesser } from 'ra-ui-materialui';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Products from './components/Products';
import Contacts from './components/Contacts';
import AppHeader from './components/Header';
import AppSider from './components/Sider';
import './App.css';
import dataProvider from './dataProvider'; // Import the data provider

const { Content } = Layout;

// Custom Layout for CoreAdmin
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

function AntAdmin() {
    return (
        <Router>
            <CoreAdmin dataProvider={dataProvider} layout={CustomLayout} title="My Admin">
                <Resource name="posts" list={ListGuesser} />
                <Resource name="customers" list={() => <Customers />} />
                <Resource name="products" list={() => <Products />} />
                <Resource name="contacts" list={() => <Contacts />} />
            </CoreAdmin>
        </Router>
    );
}

export default AntAdmin;
