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
import styled from '@emotion/styled';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const ProfileCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin-bottom: 24px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  text-align: left; // Added this to ensure left alignment
`;

const ProfileInfo = styled.div`
  margin-left: 16px; // Reduced from 24px
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CompanyDetails = styled(List)`
  display: flex;
  gap: 24px;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;

  .ant-list-item {
    margin: 0;
    padding: 0;
  }
`;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  
  .ant-tabs-nav {
    margin-bottom: 16px;
  }

  .ant-tabs-tab {
    padding: 12px 16px;
    margin: 0 16px 0 0;
    font-size: 14px;
    transition: all 0.3s ease;

    &:hover {
      color: #1890ff;
    }
  }

  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: #1890ff;
      font-weight: 500;
    }
  }

  .ant-tabs-ink-bar {
    background: #1890ff;
    height: 3px;
    border-radius: 3px;
  }
`;

const CompanyView: React.FC = () => {
  const { record: company, isLoading } = useShowContext<Company>();

  if (isLoading) return <Spin size="large" />;
  if (!company) return null;

  return (
    <div>
      <Row gutter={[3, 3]}>
        <Col span={24}>
          <ProfileCard>
            <ProfileSection>
              <Avatar 
                size={64} 
                src={company.logo}
                icon={!company.logo && <BankOutlined />} // Changed from UserOutlined to BankOutlined
                style={{ 
                  backgroundColor: '#1890ff',
                  padding: 3,
                  border: '3px solid #e6f7ff',
                  flexShrink: 0
                }}
              />
              <ProfileInfo>
                <Title level={4} style={{ margin: 0 }}>
                {`${company.name}`}
                </Title>    
                <Text type="secondary" style={{ marginTop: 4 }}>
                  {company.industry}
                </Text>
              </ProfileInfo>
            </ProfileSection>

            <CompanyDetails itemLayout="horizontal" split={false}>
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
              
            </CompanyDetails>
          </ProfileCard>
        </Col>

        <Col span={24}>
          <StyledCard>
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
          </StyledCard>
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
