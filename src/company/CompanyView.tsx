import React from 'react';
import { useShowController, useGetManyReference, Identifier, useShowContext } from 'ra-core';
import { Card, Avatar, Spin, Col, Row, Tabs } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, BankOutlined } from '@ant-design/icons';
import { Contact , Company } from '../datagenerator/types/crmTypes';
import ReferenceResource from '../components/common/ReferenceResource';
import NoteCard from '../note/Note';
import LifeCycleStages from '../components/common/LifecyleStages';
import type { ColumnsType } from 'antd/es/table';
import { Table, Space, Typography, List } from 'antd';
import TaskCard from '../task/Task';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const CompanyView: React.FC = () => {
  const { record: company, isLoading } = useShowContext<Company>();

  if (isLoading) return <Spin size="large" />;
  if (!company) return null;

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Avatar 
                size={80} 
                src={company.logo}
                icon={!company.logo && <UserOutlined />}
                style={{ 
                  backgroundColor: '#1890ff',
                  padding: 4,
                  border: '4px solid #e6f7ff'
                }}
              />
              <Title level={4} style={{ marginTop: 16, marginBottom: 4 }}>
              {`${company.name}`}
              </Title>    
              <Text type="secondary">{company.industry}</Text>
            </div>

            <List itemLayout="horizontal" split={false}>
              <List.Item>
                <Space>
                  <MailOutlined style={{ color: '#1890ff' }} />
                  <Text copyable>{company.website}</Text>
                </Space>
              </List.Item>
              <List.Item>
                <Space>
                  <PhoneOutlined style={{ color: '#52c41a' }} />
                  <Text>{company.phone}</Text>
                </Space>
              </List.Item>
              
            </List>
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Contacts" key="1">
                <CompanyContactsTable companyId={company.id} />
              </TabPane>

              <TabPane tab="Pipeline" key="2">
                <LifeCycleStages DealStage="Negotiation" />
              </TabPane>

              <TabPane tab="Tasks" key="3">
                <TaskCard 
                  targetEntity="company"
                  id={company.id}
                />
              </TabPane>

              <TabPane tab="Notes" key="4">
                <NoteCard 
                  targetEntity="company"
                  id={company.id}
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

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

export default CompanyView;
