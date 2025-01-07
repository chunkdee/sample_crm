import React from 'react';
    import { Layout, Typography } from 'antd';

    const { Header } = Layout;
    const { Title } = Typography;

    function AppHeader() {
      return (
        <Header className="site-layout-background" style={{ padding: 0, background: '#fff' }}>
          <Title level={3} style={{ margin: '16px' }}>CRM Application</Title>
        </Header>
      );
    }

    export default AppHeader;
