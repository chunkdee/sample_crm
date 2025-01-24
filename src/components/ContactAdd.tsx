import React from 'react';
import { CreateBase, useCreateContext } from 'ra-core';
import { Card, Form, Input, Select, Button, Row, Col, Space, Typography, message } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, BankOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ContactAddForm: React.FC = () => {
  const { save, saving } = useCreateContext();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
    
    if (!save) throw new Error('Save function not available');
      await save(values);
      message.success('Contact created successfully');
      navigate('/contacts');
    } catch (error) {
      message.error('Error creating contact');
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <Card>
        <Title level={4} style={{ marginBottom: 24 }}>Create New Contact</Title>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ status: 'active' }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Card title="Personal Information" size="small">
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: 'Please enter name' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter email' },
                    { type: 'email', message: 'Please enter valid email' }
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="john@example.com" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[{ required: true, message: 'Please enter phone' }]}
                >
                  <Input prefix={<PhoneOutlined />} placeholder="+1 234 567 890" />
                </Form.Item>

                <Form.Item
                  name="position"
                  label="Position"
                  rules={[{ required: true, message: 'Please enter position' }]}
                >
                  <Input placeholder="Sales Manager" />
                </Form.Item>
              </Card>
            </Col>

            <Col span={12}>
              <Card title="Company Information" size="small">
                <Form.Item
                  name="companyId"
                  label="Company"
                  rules={[{ required: true, message: 'Please select company' }]}
                >
                  <Select
                    placeholder="Select company"
                    showSearch
                    optionFilterProp="children"
                  >
                    {/* Company options will be populated from API */}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="department"
                  label="Department"
                >
                  <Input placeholder="Sales" />
                </Form.Item>

                <Form.Item
                  name="notes"
                  label="Notes"
                >
                  <Input.TextArea rows={4} placeholder="Additional notes..." />
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <div style={{ marginTop: 24, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => navigate('/contacts')}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={saving}>
                Create Contact
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

const ContactAdd: React.FC = () => (
  <CreateBase resource="contacts">
    <ContactAddForm />
  </CreateBase>
);

export default ContactAdd;