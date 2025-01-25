import React from 'react';
import { CreateBase, useCreateContext } from 'ra-core';
import { Card, Form, Input, InputNumber, Select, Button, Row, Col, Space, Typography, message, Upload } from 'antd';
import { BankOutlined, TeamOutlined, EnvironmentOutlined, DollarOutlined, GlobalOutlined, InboxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const CompanyAddForm: React.FC = () => {
  const { save, saving } = useCreateContext();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
    if (!save) throw new Error('Save function not available');
      await save(values);
      message.success('Company created successfully');
      navigate('/companies');
    } catch (error) {
      message.error('Error creating company');
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <Card>
        <Title level={4} style={{ marginBottom: 24 }}>Create New Company</Title>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ status: 'active' }}
        >
          <Row gutter={24}>
            <Col span={16}>
              <Card title="Company Information" size="small">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="name"
                      label="Company Name"
                      rules={[{ required: true, message: 'Please enter company name' }]}
                    >
                      <Input prefix={<BankOutlined />} placeholder="Acme Corp" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="industry"
                      label="Industry"
                      rules={[{ required: true }]}
                    >
                      <Select placeholder="Select industry">
                        <Select.Option value="technology">Technology</Select.Option>
                        <Select.Option value="finance">Finance</Select.Option>
                        <Select.Option value="healthcare">Healthcare</Select.Option>
                        <Select.Option value="manufacturing">Manufacturing</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="size"
                      label="Company Size"
                      rules={[{ required: true }]}
                    >
                      <Select prefix={<TeamOutlined />}>
                        <Select.Option value="1-10">1-10 employees</Select.Option>
                        <Select.Option value="11-50">11-50 employees</Select.Option>
                        <Select.Option value="51-200">51-200 employees</Select.Option>
                        <Select.Option value="201-500">201-500 employees</Select.Option>
                        <Select.Option value="501+">501+ employees</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="revenue"
                      label="Annual Revenue"
                      rules={[{ required: true }]}
                    >
                      <InputNumber
                        prefix={<DollarOutlined />}
                        style={{ width: '100%' }}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card title="Location & Contact" size="small" style={{ marginTop: 24 }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="location"
                      label="Location"
                      rules={[{ required: true }]}
                    >
                      <Input prefix={<EnvironmentOutlined />} placeholder="City, Country" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="website"
                      label="Website"
                    >
                      <Input prefix={<GlobalOutlined />} placeholder="www.example.com" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="description"
                  label="Company Description"
                >
                  <Input.TextArea rows={4} placeholder="Brief description of the company..." />
                </Form.Item>
              </Card>
            </Col>

            <Col span={8}>
              <Card title="Logo Upload" size="small">
                <Upload.Dragger
                  name="logo"
                  action="/api/upload"
                  showUploadList={false}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to upload</p>
                </Upload.Dragger>
              </Card>
            </Col>
          </Row>

          <div style={{ marginTop: 24, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => navigate('/companies')}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={saving}>
                Create Company
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

const CompanyAdd: React.FC = () => (
  <CreateBase resource="companies">
    <CompanyAddForm />
  </CreateBase>
);

export default CompanyAdd;