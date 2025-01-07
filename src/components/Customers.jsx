import React, { useState } from 'react';
    import { Table, Button, Modal, Form, Input, Radio, Card, Row, Col, message, Input as AntInput } from 'antd';
    import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
    import data from '../../data.json';

    const Customers = () => {
      const [customers, setCustomers] = useState(data.customers);
      const [isModalVisible, setIsModalVisible] = useState(false);
      const [editingCustomer, setEditingCustomer] = useState(null);
      const [viewMode, setViewMode] = useState('table');
      const [searchText, setSearchText] = useState('');
      const [form] = Form.useForm();

      const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (text, record) => (
            <>
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setEditingCustomer(record);
                  form.setFieldsValue(record);
                  setIsModalVisible(true);
                }}
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.id)}
                style={{ marginLeft: 8 }}
              />
            </>
          ),
        },
      ];

      const showModal = () => {
        setEditingCustomer(null);
        form.resetFields();
        setIsModalVisible(true);
      };

      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const handleAddOrUpdate = (values) => {
        if (editingCustomer) {
          const updatedCustomers = customers.map((customer) =>
            customer.id === editingCustomer.id ? { ...customer, ...values } : customer
          );
          setCustomers(updatedCustomers);
          message.success('Customer updated successfully');
        } else {
          const newCustomer = { id: Date.now(), ...values };
          setCustomers([...customers, newCustomer]);
          message.success('Customer added successfully');
        }
        setIsModalVisible(false);
      };

      const handleDelete = (id) => {
        const updatedCustomers = customers.filter((customer) => customer.id !== id);
        setCustomers(updatedCustomers);
        message.success('Customer deleted successfully');
      };

      const handleViewModeChange = (e) => {
        setViewMode(e.target.value);
      };

      const handleSearch = (e) => {
        setSearchText(e.target.value);
      };

      const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchText.toLowerCase())
      );

      const renderCardView = () => (
        <Row gutter={[16, 16]}>
          {filteredCustomers.map((customer) => (
            <Col key={customer.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={customer.name}
                actions={[
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                      setEditingCustomer(customer);
                      form.setFieldsValue(customer);
                      setIsModalVisible(true);
                    }}
                  />,
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(customer.id)}
                  />,
                ]}
              >
                <p>Email: {customer.email}</p>
                <p>Phone: {customer.phone}</p>
              </Card>
            </Col>
          ))}
        </Row>
      );

      const tableViewIcon = (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 2C0 0.89543 0.89543 0 2 0H14C15.1046 0 16 0.89543 16 2V14C16 15.1046 15.1046 16 14 16H2C0.89543 16 0 15.1046 0 14V2ZM2 2V6H14V2H2ZM2 8V14H14V8H2Z" fill="currentColor"/>
        </svg>
      );

      const cardViewIcon = (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 2C0 0.89543 0.89543 0 2 0H6C7.10457 0 8 0.89543 8 2V6C8 7.10457 7.10457 8 6 8H2C0.89543 8 0 7.10457 0 6V2ZM10 2C10 0.89543 10.8954 0 12 0H16C17.1046 0 18 0.89543 18 2V6C18 7.10457 17.1046 8 16 8H12C10.8954 8 10 7.10457 10 6V2ZM0 10C0 8.89543 0.89543 8 2 8H6C7.10457 8 8 8.89543 8 10V14C8 15.1046 7.10457 16 6 16H2C0.89543 16 0 15.1046 0 14V10ZM10 10C10 8.89543 10.8954 8 12 8H16C17.1046 8 18 8.89543 18 10V14C18 15.1046 17.1046 16 16 16H12C10.8954 16 10 15.1046 10 14V10Z" fill="currentColor"/>
        </svg>
      );

      return (
        <div>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showModal}
            >
              Add Customer
            </Button>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <AntInput
                placeholder="Search by name"
                prefix={<SearchOutlined />}
                style={{ marginRight: 8, width: 200 }}
                value={searchText}
                onChange={handleSearch}
              />
              <Radio.Group value={viewMode} onChange={handleViewModeChange}>
                <Radio.Button value="table" style={{padding: '4px 8px'}}>{tableViewIcon}</Radio.Button>
                <Radio.Button value="card" style={{padding: '4px 8px'}}>{cardViewIcon}</Radio.Button>
              </Radio.Group>
            </div>
          </div>
          {viewMode === 'table' ? (
            <Table columns={columns} dataSource={filteredCustomers} rowKey="id" />
          ) : (
            renderCardView()
          )}
          <Modal
            title={editingCustomer ? 'Edit Customer' : 'Add Customer'}
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form form={form} onFinish={handleAddOrUpdate}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input the customer name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please input the customer email!' }]}
              >
                <Input type="email" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: 'Please input the customer phone!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {editingCustomer ? 'Update' : 'Add'}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      );
    };

    export default Customers;
