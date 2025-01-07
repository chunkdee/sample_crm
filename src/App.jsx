import React from 'react';
    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    import { Layout } from 'antd';
    import Dashboard from './components/Dashboard';
    import Customers from './components/Customers';
    // import Companies from './components/companies';
    import Contacts from './components/Contacts'
    import Products from './components/Products';
    import AppHeader from './components/Header';
    import AppSider from './components/Sider';
    import './App.css';

    const { Content } = Layout;

    function App() {
      return (
        <Router>
          <Layout style={{ minHeight: '100vh' }}>
            <AppSider />
            <Layout>
              <AppHeader />
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/contacts" element={<Contacts />} />
                  {/* <Route path="/companies" element={<Companies />} /> */}
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </Router>
      );
    }

    export default App;
