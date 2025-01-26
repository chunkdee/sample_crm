import React from 'react';
import { useShowController } from 'ra-core';
import { Card, Avatar, Typography, List, Space, Spin, Col, Row } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, BankOutlined } from '@ant-design/icons';
import { Contact , Company } from '../datagenerator/types/crmTypes';
import ReferenceResource from '../components/common/ReferenceResource';
import NoteCard from '../note/Note';
import LifeCycleStages from '../components/common/LifecyleStages';

const { Title, Text } = Typography;

const CompanyView: React.FC = () => {
  const { record: company, isLoading } = useShowController<Company>();

  if (isLoading) return <Spin size="large" />;
  if (!company) return null;

  return (
  <div style={{ padding: 24 }}>
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
    <Card title="Life Cycle Stages :">
         <LifeCycleStages DealStage="Negotiation"></LifeCycleStages>
         </Card>
        </Col>
    <Col span={16}>
          <NoteCard 
            resource="companies"
            id={company.id}
          />
        </Col>
    </Row>
  </div>
  );
};

export default CompanyView;
