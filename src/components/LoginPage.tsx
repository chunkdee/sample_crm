import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useLogin, useNotify } from 'ra-core';
import { useTheme } from '../contexts/ThemeContext';

const { Title } = Typography;
const { Content } = Layout;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const login = useLogin();
  const notify = useNotify();
  const { isDarkMode } = useTheme();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await login(values);
    } catch (error) {
      notify('Invalid email or password', { type: 'error' });
    }
    setLoading(false);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: isDarkMode ? '#141414' : '#f0f2f5' }}>
      <Content style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Card
          style={{ 
            width: 400,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            borderRadius: 8
          }}
          bordered={false}
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Title level={2} style={{ margin: 0, color: isDarkMode ? '#fff' : undefined }}>
              OctoCRM
            </Title>
            <Typography.Text type="secondary">
              Sign in to your account
            </Typography.Text>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                size="large"
                placeholder="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                size="large"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginPage;