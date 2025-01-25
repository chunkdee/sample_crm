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
import { Contact, Company } from '../datagenerator/types/crmTypes';
import { ViewButton, EditButton, DeleteButton } from '../../components/common';
import { Card, Tooltip, Avatar, Typography, List, Space, Popconfirm } from 'antd';
import { UserOutlined, BankOutlined, PhoneOutlined } from '@ant-design/icons';
import ReferenceResource from '../../components/common/ReferenceResource';
import { Identifier } from 'ra-core';
```

### Update Component Props

#### Before:
```typescript
const ContactView: React.FC<{ contact: Cont }> = ({ contact }) => {
```

#### After:
```typescript
const ContactView: React.FC<{ contact: Contact }> = ({ contact }) => {
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
const handleDelete = (id: Identifier): void => {
  // Implement the delete logic here
  console.log(`Deleting contact with ID: ${id}`);
};

const ContactView: React.FC<{ contact: Contact }> = ({ contact }) => {
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
              {(company: Company) => (
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

## Summary

These changes will update the ContactView component to use the Contact and Company types from crmTypes.ts. Ensure the import paths for `ViewButton`, `EditButton`, `DeleteButton`, and `ReferenceResource` are correct. Define the `handleDelete` function to handle the delete logic.