import React, { useState } from 'react';
import { Button, Radio, Card, Row, Col, message, Input, Form, Space, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { EditBase, useListContext } from 'ra-core';
import CustomModal from './CustomModal';
import { Customer } from '../types/models';
import styled from 'styled-components';
import Table, { ColumnsType } from 'antd/es/table';

const ViewToggle = styled.div`
  display: flex;
  gap: 8px;
  
  .view-button {
    padding: 8px 16px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s;
    
    &:hover {
      color: #1890ff;
      border-color: #1890ff;
    }
    
    &.active {
      background: #e6f7ff;
      color: #1890ff;
      border-color: #1890ff;
    }

    svg {
      font-size: 16px;
    }
  }
`;

const CustomersList: React.FC = () => { 
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchText, setSearchText] = useState<string>('');
  const {
    data: records,
    isLoading,
    setFilters,
    total
  } = useListContext<Customer>();

const customersList = records || [];


 // Filtered contacts based on search
 const filteredCustomers = customersList.filter(customer => 
  searchText ? customer.name.toLowerCase().includes(searchText.toLowerCase()) : true
);
const customers = filteredCustomers;


const columns: ColumnsType<Customer> = [
  { 
    title: 'ID', 
    dataIndex: 'id', 
    key: 'id',
    sorter: (a, b) => a.id - b.id 
  },
  { 
    title: 'Name', 
    dataIndex: 'name', 
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name)
  },
  { 
    title: 'Email', 
    dataIndex: 'email', 
    key: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email)
  },
  { 
    title: 'Phone', 
    dataIndex: 'phone', 
    key: 'phone' 
  },
  { 
    title: 'Orders', 
    dataIndex: 'orders', 
    key: 'orders',
    sorter: (a, b) => a.orders - b.orders
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record: Customer) => (
      <Space>
        <Button 
          icon={<EditOutlined />} 
          onClick={() => handleEdit(record.id)} 
        />
        <Button 
          icon={<DeleteOutlined />} 
          onClick={() => handleDelete(record.id)} 
        />
      </Space>
    )
  }
];


//Ant Design Model form fields
const modalFields = [
  { name: 'name', label: 'Name', type: 'text', rules: [{ required: true }] },
  { name: 'email', label: 'Email', type: 'email', rules: [{ required: true }] },
  { name: 'phone', label: 'Phone', type: 'text', rules: [{ required: true }] }
];



const handleCancel = () => {
  setIsModalVisible(false);
  setCustomerId(null);
};


const handleDelete = (customerId: number): void => {
    const updatedContacts = customers.filter((customer) => customer.id !== customerId);
    message.success('Contact deleted successfully');
  };

const handleEdit = (customerId: number): void => {
    setCustomerId(customerId);
    setIsModalVisible(true);
  };


  return (
  <div>
    <div style={{ 
      marginBottom: 16, 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Space size={16}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Customer
        </Button>
        <Input
          placeholder="Search customers..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setFilters({ q: e.target.value });
          }}
          style={{ width: 200 }}
        />
      </Space>

      <ViewToggle>
        <Tooltip title="Table View">
          <div
            className={`view-button ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            <UnorderedListOutlined />
          </div>
        </Tooltip>
        <Tooltip title="Card View">
          <div
            className={`view-button ${viewMode === 'card' ? 'active' : ''}`}
            onClick={() => setViewMode('card')}
          >
            <AppstoreOutlined />
          </div>
        </Tooltip>
      </ViewToggle>
    </div>

    {isLoading ? (
      <div>Loading...</div>
    ) : viewMode === 'table' ? (
        <Table 
        columns={columns} 
        dataSource={customers} 
        rowKey="id" 
        pagination={{
          total,
          pageSize: 10
        }}
      />
    ) : (
      <Row gutter={[16, 16]}>
        {customers.map((customer) => (
          <Col key={customer.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              actions={[
                <EditOutlined key="edit" onClick={() => {
                  handleEdit(customer.id);
                }} />,
                <DeleteOutlined key="delete" />
              ]}
            >
              <Card.Meta
                title={customer.name}
                description={
                  <>
                    <p>Email: {customer.email}</p>
                    <p>Phone: {customer.phone}</p>
                    <p>Orders: {customer.orders}</p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    )}

{isModalVisible && (
  <EditBase resource="customers" id={customerId}>
    <CustomModal
      title="Customer"
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      fields={modalFields}
    />
    </EditBase>
    )}
  </div>
);
};

export default CustomersList;