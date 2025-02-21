import React from 'react';
import { useShowContext } from 'ra-core';
import { Avatar, Spin, Col, Row, Tabs, Space, Typography, List } from 'antd';
import { MailOutlined, PhoneOutlined, BankOutlined } from '@ant-design/icons';
import { Company } from '../datagenerator/types/crmTypes';
import NoteCard from '../note/Note';
import LifeCycleStages from '../components/common/LifecyleStages';
import TaskCard from '../task/Task';
import CompanyContactsTable from './CompanyContacts';
import CompanyOpportunitiesTable from './CompanyOpportunities';
import CompanyOpportunitiesTable2 from './CompanyOpportunities2';
import { ReferenceManyResourceV2 } from '../components/common/ReferenceManyResourceV2';

import {
  ProfileCard,
  ProfileSection,
  ProfileInfo,
  CompanyDetails,
  StyledCard
} from './CompanyStyle';
import { Opportunity } from '../deal';
import Opportunities from '../deal/Opportunity';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

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

              <TabPane tab="Opportunities" key="2">
                 <ReferenceManyResourceV2<Opportunity>
                                            resource="opportunities"
                                            id={company.id}
                                            target='companyId'
                                          >
                <CompanyOpportunitiesTable2/>
                 </ReferenceManyResourceV2>
              
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

export default CompanyView;
