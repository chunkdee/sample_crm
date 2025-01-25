import React, { useState } from 'react';
import { Card, Form, Input, DatePicker, Select, Button, Table, InputNumber, Space, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { QuoteStatus } from '../types/models';

const { Title } = Typography;

const CreateQuote: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);

  const handleSubmit = (values: any) => {
    const quoteData = {
      ...values,
      items,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    console.log('Quote Data:', quoteData);
    navigate('/quotes');
  };

  const itemColumns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '40%'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '20%'
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      width: '20%'
    },
    {
      title: 'Total',
      key: 'total',
      render: (record: any) => record.quantity * record.unitPrice
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any, index: number) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => setItems(items.filter((_, i) => i !== index))}
        />
      )
    }
  ];

  return (
    <Card>
      <Title level={4} style={{ marginBottom: 24 }}>Create New Quote</Title>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ status: QuoteStatus.Draft }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <Card title="Quote Details" size="small">
            <Form.Item
              name="title"
              label="Quote Title"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              name="description"
              label="Description"
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="validUntil"
              label="Valid Until"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
            >
              <Select>
                {Object.values(QuoteStatus).map(status => (
                  <Select.Option key={status} value={status}>
                    {status}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Card>

          <Card title="Customer Information" size="small">
            <Form.Item
              name="companyId"
              label="Company"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                placeholder="Select company"
                optionFilterProp="children"
              >
                {/* Add company options */}
              </Select>
            </Form.Item>

            <Form.Item
              name="contactId"
              label="Contact Person"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                placeholder="Select contact"
                optionFilterProp="children"
              >
                {/* Add contact options */}
              </Select>
            </Form.Item>
          </Card>
        </div>

        <Card 
          title="Quote Items" 
          size="small" 
          style={{ marginTop: 24 }}
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setItems([...items, { id: items.length + 1 }])}
            >
              Add Item
            </Button>
          }
        >
          <Table
            columns={itemColumns}
            dataSource={items}
            rowKey="id"
            pagination={false}
          />
        </Card>

        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <Space>
            <Button onClick={() => navigate('/quotes')}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Create Quote
            </Button>
          </Space>
        </div>
      </Form>
    </Card>
  );
};

export default CreateQuote;