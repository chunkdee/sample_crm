# ContactView Component Updates

## Steps to Update ContactView Component

1. **Update Import Statements:**
   Update the import statements in `ContactView.tsx` to use the `Contact` and `Company` types from `crmTypes.ts`.

2. **Update Component Props:**
   Update the component props to use the `Contact` and `Company` types.

3. **Update Component Logic:**
   Update the component logic to use the `Contact` and `Company` types.

4. **Ensure Correct Module Paths:**
   Ensure the import paths for `ViewButton`, `EditButton`, `DeleteButton`, and `ReferenceResource` are correct.

5. **Define `handleDelete` Function:**
   Define the `handleDelete` function to handle the delete logic.

6. **Style the Component:**
   Style the component to display other properties in contact records like the profile picture.

7. **Add Notes Section:**
   Add a section to add notes to the contact.

8. **Reduce Profile Image Card Height:**
   Reduce the height of the profile image card.

9. **Set Fixed Height for Profile Image Card:**
   Set a fixed height for the Card that contains the profile image.

## Example Updates

### Update Import Statements

#### Before:
```typescript
import { Contact as Cont, Company } from '../types/models';
import { ViewButton, EditButton, DeleteButton } from '../common';
import { Card, Tooltip, Avatar, Typography, List, Space, Popconfirm } from 'antd';
import { UserOutlined, BankOutlined, PhoneOutlined } from '@ant-design/icons';
import { ReferenceResource } from '../common/ReferenceResource';
```

#### After:
```typescript
import React from 'react';
import { useShowController } from 'ra-core';
import { Card, Avatar, Typography, List, Space, Spin, Col, Row } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, BankOutlined } from '@ant-design/icons';
import { Contact, Company } from '../datagenerator/types/crmTypes';
import ReferenceResource from '../components/common/ReferenceResource';
import NoteCard from '../note/Note';
```

### Update Component Props

#### Before:
```typescript
const ContactView: React.FC<{ contact: Cont }> = ({ contact }) => {
```

#### After:
```typescript
const { Title, Text } = Typography;

const ContactView: React.FC = () => {
  const { record: contact, isLoading } = useShowController<Contact>();

  if (isLoading) return <Spin size="large" />;
  if (!contact) return null;
```

### Update Component Logic

#### Before:
```typescript
const ContactView: React.FC<{ contact: Cont }> = ({ contact }) => {
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
```

#### After:
```typescript
return (
  <div style={{ padding: 24 }}>
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Card style={{ height: '300px' }}> {/* Fixed height for the profile image card */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Avatar
              size={60} // Reduced size
              src={contact.profileImage}
              icon={!contact.profileImage && <UserOutlined />}
              style={{
                backgroundColor: '#1890ff',
                padding: 4,
                border: '4px solid #e6f7ff',
              }}
            />
            <Title level={4} style={{ marginTop: 16, marginBottom: 4 }}>
              {`${contact.firstName} ${contact.lastName}`}
            </Title>
            <Text type="secondary">{contact.position}</Text>
          </div>

          <List itemLayout="horizontal" split={false}>
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
            <List.Item>
              <ReferenceResource<Company>
                resource="companies"
                id={contact.companyId || ''}
              >
                {(company) => (
                  <Space>
                    <BankOutlined style={{ color: '#722ed1' }} />
                    <Text>{company.name}</Text>
                  </Space>
                )}
              </ReferenceResource>
            </List.Item>
          </List>
        </Card>
      </Col>
      <Col span={16}>
        <NoteCard
          resource="contacts"
          id={contact.id}
        />
      </Col>
    </Row>
  </div>
);
```

## Summary

These changes will update the ContactView component to use the Contact and Company types from crmTypes.ts. Ensure the import paths for `ViewButton`, `EditButton`, `DeleteButton`, and `ReferenceResource` are correct. Define the `handleDelete` function to handle the delete logic. Style the component to display other properties in contact records like the profile picture. Add a section to add notes to the contact. Reduce the height of the profile image card. Set a fixed height for the Card that contains the profile image.