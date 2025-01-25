import React, { useEffect, useState } from 'react';
import { Card, Form, Input, DatePicker, Select, Button, Table, InputNumber, Space, Typography, Spin, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { EditBase, useEditContext } from 'ra-core';
import { Quote, QuoteStatus } from '../types/models';
import dayjs from 'dayjs';

const { Title } = Typography;

const EditQuoteForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { record, save, saving, error } = useEditContext();
  const [items, setItems] = useState(record?.items || []);

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        ...record,
        validUntil: record.validUntil ? dayjs(record.validUntil) : null
      });
      setItems(record.items || []);
    }
  }, [record, form]);

  const handleSubmit = async (values: any) => {
    try {
      if (!save) throw new Error('Save function not available');
      await save({
        ...values,
        items,
        updatedAt: new Date()
      });
      message.success('Quote updated successfully');
      navigate('/quotes');
    } catch (error) {
      message.error('Failed to update quote');
    }
  };

  if (!record) return null;

  return (
    <Card>
      <Title level={4} style={{ marginBottom: 24 }}>Edit Quote #{record?.number}</Title>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <Card title="Quote Details" size="small">
            <Form.Item name="title" label="Quote Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            
            <Form.Item name="description" label="Description">
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item name="validUntil" label="Valid Until" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
              <Select>
                {Object.values(QuoteStatus).map(status => (
                  <Select.Option key={status} value={status}>{status}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Card>

          <Card title="Customer Information" size="small">
            <Form.Item name="companyId" label="Company" rules={[{ required: true }]}>
              <Select showSearch placeholder="Select company" optionFilterProp="children">
                {/* Add company options */}
              </Select>
            </Form.Item>

            <Form.Item name="contactId" label="Contact Person" rules={[{ required: true }]}>
              <Select showSearch placeholder="Select contact" optionFilterProp="children">
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
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setItems([...items, { id: items.length + 1 }])}>
              Add Item
            </Button>
          }
        >
          <Table
            columns={[
              {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                width: '40%',
                render: (text: string, record: any, index: number) => (
                  <Input 
                    value={text}
                    onChange={e => {
                      const newItems = [...items];
                      newItems[index].description = e.target.value;
                      setItems(newItems);
                    }}
                  />
                )
              },
              {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
                width: '20%',
                render: (value: number, record: any, index: number) => (
                  <InputNumber
                    value={value}
                    onChange={value => {
                      const newItems = [...items];
                      newItems[index].quantity = value;
                      setItems(newItems);
                    }}
                  />
                )
              },
              {
                title: 'Unit Price',
                dataIndex: 'unitPrice',
                key: 'unitPrice',
                width: '20%',
                render: (value: number, record: any, index: number) => (
                  <InputNumber
                    value={value}
                    onChange={value => {
                      const newItems = [...items];
                      newItems[index].unitPrice = value;
                      setItems(newItems);
                    }}
                    prefix="$"
                  />
                )
              },
              {
                title: 'Total',
                key: 'total',
                render: (record: any) => `$${(record.quantity * record.unitPrice).toFixed(2)}`
              },
              {
                title: 'Actions',
                key: 'actions',
                render: (_: any, record: any, index: number) => (
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                  />
                )
              }
            ]}
            dataSource={items}
            rowKey="id"
            pagination={false}
          />
        </Card>

        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <Space>
            <Button onClick={() => navigate('/quotes')}>Cancel</Button>
            <Button type="primary" htmlType="submit">Save Changes</Button>
          </Space>
        </div>
      </Form>
    </Card>
  );
};

const EditQuote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <EditBase resource="quotes" id={id}>
      <EditQuoteForm />
    </EditBase>
  );
};

export default EditQuote;
