import React, { useState } from 'react';
import { 
  Row, 
  Col, 
  Input, 
  Space, 
  Avatar, 
  Typography, 
  List,
  Tag,
  Segmented
} from 'antd';
import { 
  SearchOutlined, 
  UserOutlined, 
  TableOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { Identifier, useListContext } from 'ra-core';
import { Contact, Company } from '../datagenerator/types/crmTypes';
import type { ColumnsType } from 'antd/es/table';
import ViewButton from '../components/common/ViewButton';
import EditButton from '../components/common/EditButton';
import CreateButton from '../components/common/CreateButton';
import DeleteButton from '../components/common/DeleteButton';
import ReferenceResource from '../components/common/ReferenceResource';
import { useNavigate } from 'react-router-dom';
import {
  StyledCard,
  ContactCard,
  HeaderSection,
  SearchSection,
  StyledTable,
  ContactAvatar,
  ContactInfo
} from './ContactStyle';

const { Text, Title } = Typography;

const CardView: React.FC<{ contact: Contact }> = ({ contact }) => (
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
          <Text copyable>{contact.email}</Text>
        </Space>
      </List.Item>
    </List>
  </ContactCard>
);

const ContactList: React.FC = () => {
  const navigate = useNavigate();
  const { data: contacts, isLoading } = useListContext<Contact>();
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

  const handleViewModeChange = (value: 'table' | 'card') => {
    setViewMode(value);
  };

  const handleRowClick = (record: Contact) => {
    navigate(`/contacts/${record.id}/show`);
  };

  const columns: ColumnsType<Contact> = [
    {
      title: 'Contact',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`),
      render: (_, record: Contact) => (
        <ContactInfo>
          <div className="contact-details">
            <ContactAvatar 
              src={record.profileImage} 
              icon={!record.profileImage && <UserOutlined />}
              size={40}
              style={{ 
                backgroundColor: record.profileImage ? 'transparent' : '#1890ff',
                border: '2px solid #f0f0f0'
              }}
            />
            <div className="name-section">
              <Text strong style={{ fontSize: '14px' }}>
                {`${record.firstName} ${record.lastName}`}
              </Text>
            </div>
          </div>
          <div className="company-section">
            <ReferenceResource<Company> resource="companies" id={record.companyId || 0}>
              {(company) => (
                <Space size={4}>
                  {record.position && (
                    <>
                      <Text type="secondary" style={{ fontSize: '13px' }}>
                        {record.position}
                      </Text>
                      <Text type="secondary" style={{ fontSize: '13px' }}>at</Text>
                    </>
                  )}
                  <Text style={{ fontSize: '13px' }}>{company.name}</Text>
                  <Tag 
                    color="blue" 
                    style={{ 
                      fontSize: '12px',
                      padding: '0 8px',
                      borderRadius: '4px'
                    }}
                  >
                    {company.industry}
                  </Tag>
                </Space>
              )}
            </ReferenceResource>
          </div>
        </ContactInfo>
      ),
      width: '70%'
    }
  ];

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
        <StyledTable
          columns={columns}
          dataSource={contacts}
          loading={isLoading}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
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
              <CardView contact={contact} />
            </Col>
          ))}
        </Row>
      )}
    </StyledCard>
  );
};

export default ContactList;