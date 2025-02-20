import React from 'react';
import { useShowContext } from 'ra-core';
import { Avatar, Typography, List, Space, Spin, Col, Row } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, BankOutlined } from '@ant-design/icons';
import { Contact, Company } from '../datagenerator/types/crmTypes';
import ReferenceResource from '../components/common/ReferenceResource';
import NoteCard from '../note/Note';
import TaskCard from '../task/Task';
import {
  ProfileCard,
  ProfileSection,
  ProfileInfo,
  ContactDetails
} from './ContactStyle';

const { Title, Text } = Typography;

const ContactView: React.FC = () => {
  const { record: contact, isLoading } = useShowContext<Contact>();

  if (isLoading) return <Spin size="large" />;
  if (!contact) return null;

  return (
    <div>
      <Row gutter={[3, 3]}>
        <Col span={24}>
          <ProfileCard>
            <ProfileSection>
              <Avatar 
                size={64} // Reduced from 80
                src={contact.profileImage}
                icon={!contact.profileImage && <UserOutlined />}
                style={{ 
                  backgroundColor: '#1890ff',
                  padding: 3,
                  border: '3px solid #e6f7ff',
                  flexShrink: 0
                }}
              />
              <ProfileInfo>
                <Title level={4} style={{ margin: 0 }}>
                  {`${contact.firstName} ${contact.lastName}`}
                </Title>
                <Text type="secondary" style={{ fontSize: '14px' }}>
                  {contact.position}
                </Text>
              </ProfileInfo>
            </ProfileSection>

            <ContactDetails itemLayout="horizontal" split={false}>
              <List.Item>
                <Space>
                  <MailOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
                  <Text copyable>{contact.email}</Text>
                </Space>
              </List.Item>
              <List.Item>
                <Space>
                  <PhoneOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
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
                      <BankOutlined style={{ color: '#722ed1', fontSize: '16px' }} />
                      <Text>{company.name}</Text>
                    </Space>
                  )}
                </ReferenceResource>
              </List.Item>
            </ContactDetails>
          </ProfileCard>
        </Col>

        <Col span={16}>
          <NoteCard 
            targetEntity="contact"
            id={contact.id}
          />
        </Col>
        <Col span={8}>
          <TaskCard 
            targetEntity="contact"
            id={contact.id}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ContactView;