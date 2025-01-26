import React from 'react';
import { useShowController } from 'ra-core';
import { Card, Avatar, Typography, List, Space, Spin, Col, Row } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, BankOutlined } from '@ant-design/icons';
import { Contact , Company } from '../datagenerator/types/crmTypes';
import ReferenceResource from '../components/common/ReferenceResource';
import NoteCard from '../note/Note';

const { Title, Text } = Typography;

const ContactView: React.FC = () => {
  const { record: contact, isLoading } = useShowController<Contact>();

  if (isLoading) return <Spin size="large" />;
  if (!contact) return null;

  return (
  <div style={{ padding: 24 }}>
    <Row gutter={[24, 24]}>
    <Col span={24}>
    <Card>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Avatar 
          size={80} 
          src={contact.profileImage}
          icon={!contact.profileImage && <UserOutlined />}
          style={{ 
            backgroundColor: '#1890ff',
            padding: 4,
            border: '4px solid #e6f7ff'
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
};

export default ContactView;