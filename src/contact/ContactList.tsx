import React, { useState } from 'react';
import { 
  Table, 
  Card, 
  Row, 
  Col, 
  message, 
  Input, 
  Tooltip, 
  Space, 
  Avatar, 
  Typography, 
  List,
  Tag,
  Dropdown,
  Button,
  Segmented
} from 'antd';
import { 
  SearchOutlined, 
  UserOutlined, 
  BankOutlined, 
  PhoneOutlined,
  MailOutlined,
  EllipsisOutlined,
  FilterOutlined,
  TableOutlined,
  AppstoreOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Identifier, useListContext } from 'ra-core';
import { Contact, Company } from '../datagenerator/types/crmTypes';
import type { ColumnsType } from 'antd/es/table';
import ViewButton from '../components/common/ViewButton';
import EditButton from '../components/common/EditButton';
import CreateButton from '../components/common/CreateButton';
import DeleteButton from '../components/common/DeleteButton';
import ReferenceResource from '../components/common/ReferenceResource';
import styled from '@emotion/styled';
const { Text, Title } = Typography;

// Professional styling
const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  
  .ant-card-body {
    padding: 24px;
  }
`;

const ContactCard = styled(Card)`
  border-radius: 10px;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    transform: translateY(-2px);
  }
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 0 24px;
  border-bottom: 1px solid #f0f0f0;
`;

const SearchSection = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const CardView: React.FC<{ contact: Contact; handleDelete: (id: Identifier) => void }> = ({ contact, handleDelete }) => (
  <ContactCard
    actions={[
      <ViewButton key="view" resource="contacts" recordId={contact.id} />,
      <EditButton key="edit" resource="contacts" recordId={contact.id} />,
      <DeleteButton key="delete" resource="contacts" recordId={contact.id} />
    ]}
  >
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <Avatar
        size={80}
        src={contact.profileImage}
        icon={!contact.profileImage && <UserOutlined />}
        style={{
          border: '3px solid #1890ff',
          padding: '3px',
          background: '#fff',
          marginBottom: '16px',
          boxShadow: '0 2px 8px rgba(24,144,255,0.15)'
        }}
      />
      <Title level={4} style={{ margin: '12px 0 4px', fontSize: '16px' }}>
        {`${contact.firstName} ${contact.lastName}`}
      </Title>
      <ReferenceResource<Company> resource="companies" id={contact.companyId || 0}>
        {(company) => (
          <Tag color="blue" style={{ margin: '8px 0' }}>
            {company.name}
          </Tag>
        )}
      </ReferenceResource>
    </div>

    <List size="small" split={false}>
      <List.Item>
        <Space>
          <MailOutlined style={{ color: '#1890ff' }} />
          <Text copyable>{contact.email}</Text>
        </Space>
      </List.Item>
      <List.Item>
        <Space>
          <PhoneOutlined style={{ color: '#52c41a' }} />
          <Text>{contact.phone}</Text>
        </Space>
      </List.Item>
    </List>
  </ContactCard>
);

const ContactList: React.FC = () => {
  const { data: contacts, isLoading } = useListContext<Contact>();
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [filters, setFilters] = useState<{ q: string }>({ q: '' });

  // Add view mode toggle
  const handleViewModeChange = (value: 'table' | 'card') => {
    setViewMode(value);
  };

  const columns: ColumnsType<Contact> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`),
      render: (_, record: Contact) => (
        <Space>
          <Avatar 
            src={record.profileImage} 
            icon={!record.profileImage && <UserOutlined />}
            style={{ 
              border: '2px solid #f0f0f0',
              backgroundColor: record.profileImage ? 'transparent' : '#1890ff'
            }}
          />
          <Text strong>{`${record.firstName} ${record.lastName}`}</Text>
        </Space>
      ),
      width: '25%'
    },
    {
      title: 'Company',
      key: 'company',
      width: '20%',
      render: (_, record: Contact) => (
        <ReferenceResource<Company> resource="companies" id={record.companyId || 0}>
          {(company) => (
            <Space>
              <BankOutlined style={{ color: '#1890ff' }} />
              <Text>{company.name}</Text>
            </Space>
          )}
        </ReferenceResource>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      render: (email: string) => (
        <Space>
          <Text copyable>{email}</Text>
        </Space>
      )
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: '15%',
      render: (phone: string) => (
        <Space>
          <Text>{phone}</Text>
        </Space>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '15%',
      render: (_, record: Contact) => (
        <Space size={4}>
          <Tooltip title="View Contact">
            <ViewButton 
              resource="contacts" 
              recordId={record.id}

            >
            </ViewButton>
          </Tooltip>
          <Tooltip title="Edit Contact">
            <EditButton 
              resource="contacts" 
              recordId={record.id}
            
            />
          </Tooltip>
          <Tooltip title="Delete Contact">
            <DeleteButton 
              resource="contacts" 
              recordId={record.id}
            
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const handleDelete = (id: Identifier): void => {
    message.success('Contact deleted successfully');
  };

  return (
    <StyledCard>
      <HeaderSection>
        <div>
          <Title level={4} style={{ marginBottom: '8px' }}>Contacts</Title>
          <Text type="secondary">Manage your contacts and their information</Text>
        </div>
        <SearchSection>
          <Input.Search
            placeholder="Search contacts..."
            prefix={<SearchOutlined />}
            style={{ width: 280 }}
            onChange={(e) => setFilters({ q: e.target.value })}
          />
          <Segmented
            options={[
              {
                value: 'table',
                icon: <TableOutlined />
              },
              {
                value: 'card',
                icon: <AppstoreOutlined />
              }
            ]}
            value={viewMode}
            onChange={(value) => handleViewModeChange(value as 'table' | 'card')}
          />
          <CreateButton resource="contacts" />
        </SearchSection>
      </HeaderSection>

      {viewMode === 'table' ? (
        <Table<Contact>
          columns={columns}
          dataSource={contacts}
          loading={isLoading}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} contacts`,
            defaultPageSize: 10,
            style: { marginTop: '24px' }
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
    </StyledCard>
  );
};

export default ContactList;