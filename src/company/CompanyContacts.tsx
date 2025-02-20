import React from 'react';
import { Avatar, Space, Typography, Table } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useGetManyReference, Identifier } from 'ra-core';
import { Contact } from '../datagenerator/types/crmTypes';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

const CompanyContactsTable: React.FC<{ companyId: Identifier }> = ({ companyId }) => {
  const { data: contacts, isLoading } = useGetManyReference<Contact>(
    'contacts',
    { target: 'companyId', id: String(companyId) },
  );

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
  ];

  return (
    <Table
      columns={columns}
      dataSource={contacts}
      loading={isLoading}
      rowKey="id"
      pagination={{
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} contacts`,
        defaultPageSize: 5
      }}
      scroll={{ x: true }}
    />
  );
};

export default CompanyContactsTable;