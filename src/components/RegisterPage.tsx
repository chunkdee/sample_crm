import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Layout } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';
import { useNotify } from 'ra-core';
import { useTheme } from '../contexts/ThemeContext';
import { supabaseAuthProvider } from '../supabase';

const { Title } = Typography;
const { Content } = Layout;

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const notify = useNotify();
  const { isDarkMode } = useTheme();

  const onFinish = async (values: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    setLoading(true);
    try {
      await supabaseAuthProvider.register({
        ...values,
        role: 'user'
      });
      notify('Registration successful! Please check your email to verify your account.', {
        type: 'success'
      });
    } catch (error: any) {
      notify(error.message || 'Registration failed', { type: 'error' });
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
              Create Account
            </Title>
            <Typography.Text type="secondary">
              Join OctoCRM today
            </Typography.Text>
          </div>

          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input 
                prefix={<IdcardOutlined />} 
                size="large"
                placeholder="First Name"
              />
            </Form.Item>

            <Form.Item
              name="lastName"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input 
                prefix={<IdcardOutlined />} 
                size="large"
                placeholder="Last Name"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                size="large"
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 8, message: 'Password must be at least 8 characters!' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                size="large"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                size="large"
                placeholder="Confirm Password"
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
                Register
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center' }}>
              <Typography.Text type="secondary">
                Already have an account?{' '}
                <Typography.Link href="/login">
                  Sign in
                </Typography.Link>
              </Typography.Text>
            </div>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default RegisterPage;