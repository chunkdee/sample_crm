import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { CoreAdmin, Resource, useDataProvider } from 'ra-core';
import { ListGuesser } from 'ra-ui-materialui'; // Or your preferred UI library
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Products from './components/Products';
import Contacts from './components/Contacts';
import AppHeader from './components/Header';
import AppSider from './components/Sider';
import './App.css';

const { Content } = Layout;

// Mock Data Provider (Replace with your actual data provider)
const mockDataProvider = {
    getList: (resource, params) => {
        console.log('getList', resource, params);
        return Promise.resolve({  [], total: 0 });
    },
    getOne: (resource, params) => {
        console.log('getOne', resource, params);
        return Promise.resolve({  { id: params.id } });
    },
    getMany: (resource, params) => {
        console.log('getMany', resource, params);
        return Promise.resolve({  params.ids.map(id => ({ id })) });
    },
    getManyReference: (resource, params) => {
        console.log('getManyReference', resource, params);
        return Promise.resolve({  [], total: 0 });
    },
    create: (resource, params) => {
        console.log('create', resource, params);
        return Promise.resolve({  { ...params.data, id: 1 } });
    },
    update: (resource, params) => {
        console.log('update', resource, params);
        return Promise.resolve({  params.data });
    },
    updateMany: (resource, params) => {
        console.log('updateMany', resource, params);
        return Promise.resolve({  params.ids });
    },
    delete: (resource, params) => {
        console.log('delete', resource, params);
        return Promise.resolve({  { id: params.id } });
    },
    deleteMany: (resource, params) => {
        console.log('deleteMany', resource, params);
        return Promise.resolve({  params.ids });
    },
};

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
            <CoreAdmin dataProvider={mockDataProvider} layout={CustomLayout} title="My Admin">
                <Resource name="dashboard" list={() => <Dashboard />} />
                <Resource name="customers" list={() => <Customers />} />
                <Resource name="products" list={() => <Products />} />
                <Resource name="contacts" list={() => <Contacts />} />
            </CoreAdmin>
        </Router>
    );
}

export default AntAdmin;
