import React, { useState } from 'react';
import { Table, Button, Card, Row, Col, message, Input, Form, Tooltip, Space, Avatar, Typography, List, Popconfirm, Spin, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, UnorderedListOutlined, AppstoreOutlined, UserOutlined, BankOutlined, TeamOutlined, EnvironmentOutlined, DollarOutlined, PhoneOutlined, TableOutlined } from '@ant-design/icons';
import { EditBase, Identifier, useListContext, useGetOne } from 'ra-core';
import CustomModal from '../components/CustomModal';
import { Contact as Cont, Company } from '../types/models';
import { ViewToggle } from '../components/styles/ViewToggle';
import { ActionButton, ActionGroup } from '../components/styles/ActionButtons';
import { ColumnProps } from 'antd/es/table';
import { TableColumn, createSortableColumn } from './tableColumnns';
import { Contact } from '../datagenerator/types/crmTypes';
import type { ColumnsType } from 'antd/es/table';
import ViewButton from './common/ViewButton';
import EditButton from './common/EditButton';
import CreateButton from './common/CreateButton';
import DeleteButton from './common/DeleteButton';
import ReferenceResource from './common/ReferenceResource';

const { Text } = Typography;

const gridStyle = {
  width: '100%',
  padding: '16px',
  marginBottom: '8px',
  cursor: 'pointer',
};

const CompanyCell: React.FC<{ companyId: number }> = ({ companyId }) => {
  return (
    <ReferenceResource<Company>
      resource="companies"
      id={companyId}
    >
      {(company) => (
        <Space>
          <Avatar
            size="small"
            src={company.logo}
            icon={!company.logo && <BankOutlined />}
          />
          <Text>{company.name}</Text>
        </Space>
      )}
    </ReferenceResource>
  );
};

const CardView: React.FC<{ contact: Contact; handleDelete: (id: Identifier) => void }> = ({ contact, handleDelete }) => {
  return (
    <Card
      hoverable
      size="small"
      style={{
        height: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        marginBottom: '16px',
      }}
      bodyStyle={{ padding: '16px' }}
      actions={[
        <Tooltip title="View Contact">
          <ViewButton resource="contacts" recordId={contact.id} />
        </Tooltip>,
        <Tooltip title="Edit Contact">
          <EditButton resource="contacts" recordId={contact.id} />
        </Tooltip>,
        <Popconfirm
          title="Delete this contact?"
          onConfirm={() => handleDelete(contact.id)}
        >
          <Tooltip title="Delete Contact">
            <DeleteButton resource="contacts" recordId={contact.id} />
          </Tooltip>
        </Popconfirm>,
      ]}
    >
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <Avatar
          size={64}
          src={contact.profileImage}
          icon={!contact.profileImage && <UserOutlined />}
          style={{
            border: '2px solid #1890ff',
            padding: '2px',
            background: '#fff',
            marginBottom: '16px',
          }}
        />
        <Typography.Title
          level={4}
          style={{
            marginBottom: '8px',
            fontSize: '18px',
            lineHeight: '1.2',
          }}
        >
          {`${contact.firstName} ${contact.lastName}`}
        </Typography.Title>
        <Typography.Text
          type="secondary"
          style={{
            fontSize: '14px',
            display: 'block',
            marginBottom: '8px',
          }}
        >
          {contact.email}
        </Typography.Text>
      </div>

      <List
        size="small"
        split={false}
        style={{ fontSize: '14px' }}
      >
        <List.Item style={{ padding: '4px 0' }}>
          <Space size={8}>
            <BankOutlined style={{ color: '#1890ff', fontSize: '14px' }} />
            <ReferenceResource<Company>
              resource="companies"
              id={contact.companyId || 0}
            >
              {(company) => (
                <Typography.Text style={{ fontSize: '14px' }}>
                  {company.name}
                </Typography.Text>
              )}
            </ReferenceResource>
          </Space>
        </List.Item>
        <List.Item style={{ padding: '4px 0' }}>
          <Space size={8}>
            <PhoneOutlined style={{ color: '#52c41a', fontSize: '14px' }} />
            <Typography.Text style={{ fontSize: '14px' }}>
              {contact.phone}
            </Typography.Text>
          </Space>
        </List.Item>
      </List>
    </Card>
  );
};

const ContactList: React.FC = () => {
  const { data: contacts, isLoading } = useListContext<Contact>();
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

  const columns: ColumnsType<Contact> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`),
      render: (_, record: Contact) => (
        <Space>
          <Avatar src={record.profileImage} icon={!record.profileImage && <UserOutlined />} />
          <Text strong>{`${record.firstName} ${record.lastName}`}</Text>
        </Space>
      ),
      width: '30%'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      render: (email: string) => (
        <Text copyable>{email}</Text>
      ),
      width: '25%'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: string) => (
        <Text>{phone}</Text>
      ),
      width: '15%'
    },
    {
      title: 'Company',
      dataIndex: 'companyId',
      key: 'company',
      render: (companyId: number) => <CompanyCell companyId={companyId} />,
      width: '20%'
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '10%',
      render: (_, record: Contact) => (
        <ActionGroup>
          <ViewButton resource="contacts" recordId={record.id} />
          <EditButton resource="contacts" recordId={record.id} />
          <DeleteButton resource="contacts" recordId={record.id} />
        </ActionGroup>
      )
    }
  ];

  const [filters, setFilters] = useState<{ q: string }>({ q: '' });

  const handleDelete = (id: Identifier): void => {
    const updatedContacts = contacts?.filter((contact) => contact.id !== id);
    message.success('Contact deleted successfully');
  };

  return (
    <Card>
      <div style={{
        marginBottom: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Space size={16}>
          <CreateButton resource="contacts" />
          <Input.Search
            placeholder="Search contacts..."
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
            onChange={(e) => setFilters({ q: e.target.value })}
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

      {viewMode === 'table' ? (
        <Table<Contact>
          columns={columns}
          dataSource={contacts}
          loading={isLoading}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} contacts`,
            defaultPageSize: 10
          }}
          scroll={{ x: true }}
        />
      ) : (
        <Row gutter={[16, 16]}>
          {contacts?.map(contact => (
            <Col xs={24} sm={12} md={8} lg={6} key={contact.id}>
              <CardView contact={contact} handleDelete={handleDelete} />
            </Col>
          ))}
        </Row>
      )}
    </Card>
  );
};

export default ContactList;