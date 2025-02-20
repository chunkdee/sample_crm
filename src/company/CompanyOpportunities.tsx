import React, { useState } from 'react';
import { Space, Typography, Table, Tag, Modal, Card, Row, Col, Statistic, Timeline, List, Avatar } from 'antd';
import { DollarOutlined, CalendarOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useGetManyReference, Identifier } from 'ra-core';
import { Opportunity } from '../datagenerator/types/crmTypes';
import type { ColumnsType } from 'antd/es/table';
import styled from '@emotion/styled';
import NoteCard from '../note/Note';
import { Contact } from '../datagenerator/types/crmTypes';
import ReferenceManyResource from '../components/common/ReferenceManyResource';


const { Text, Title } = Typography;

const DetailsCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin-bottom: 16px;
`;

const StageTimeline = styled(Timeline)`
  padding: 16px;
  
  .ant-timeline-item-tail {
    border-left: 2px solid #e8e8e8;
  }
`;

const CompanyOpportunitiesTable: React.FC<{ companyId: Identifier }> = ({ companyId }) => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRowClick = (record: Opportunity) => {
    setSelectedOpportunity(record);
    setIsModalVisible(true);
  };

  const { data: opportunities, isLoading } = useGetManyReference<Opportunity>(
    'opportunities',
    { target: 'companyId', id: String(companyId) },
  );

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Prospecting': return 'blue';
      case 'Qualification': return 'cyan';
      case 'Proposal': return 'orange';
      case 'Negotiation': return 'purple';
      case 'Closed Won': return 'green';
      case 'Closed Lost': return 'red';
      default: return 'default';
    }
  };

  const columns: ColumnsType<Opportunity> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string) => (
        <Text strong>{name}</Text>
      ),
      width: '30%'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      render: (amount: number) => (
        <Space>
          <DollarOutlined style={{ color: '#52c41a' }} />
          <Text>{amount.toLocaleString('en-US', { 
            style: 'currency', 
            currency: 'USD' 
          })}</Text>
        </Space>
      ),
      width: '25%'
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      sorter: (a, b) => a.stage.localeCompare(b.stage),
      render: (stage: string) => (
        <Tag color={getStageColor(stage)} style={{ minWidth: 90, textAlign: 'center' }}>
          {stage}
        </Tag>
      ),
      width: '20%'
    },
    {
      title: 'Close Date',
      dataIndex: 'closeDate',
      key: 'closeDate',
      sorter: (a, b) => new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime(),
      render: (date: Date) => (
        <Text>{new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}</Text>
      ),
      width: '25%'
    }
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={opportunities}
        loading={isLoading}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: { cursor: 'pointer' }
        })}
        pagination={{
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} opportunities`,
          defaultPageSize: 5
        }}
        scroll={{ x: true }}
      />

      <Modal
        title={null}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={1000}
        footer={null}
        bodyStyle={{ padding: '24px' }}
      >
        {selectedOpportunity && (
          <>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <DetailsCard>
                  <Row align="middle" justify="space-between">
                    <Col>
                      <Title level={4}>{selectedOpportunity.name}</Title>
                      <Tag color={getStageColor(selectedOpportunity.stage)} 
                           style={{ padding: '4px 12px', fontSize: '14px' }}>
                        {selectedOpportunity.stage}
                      </Tag>
                    </Col>
                    <Col>
                      <Statistic
                        title="Amount"
                        value={selectedOpportunity.amount}
                        precision={2}
                        prefix={<DollarOutlined />}
                      />
                    </Col>
                  </Row>
                </DetailsCard>
              </Col>

              <Col span={16}>
                <DetailsCard title="Opportunity Details">
                  <Row gutter={[24, 16]}>
                    <Col span={12}>
                      <Space direction="vertical" size="small">
                        <Text type="secondary">Close Date</Text>
                        <Space>
                          <CalendarOutlined style={{ color: '#1890ff' }} />
                          <Text>{new Date(selectedOpportunity.closeDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</Text>
                        </Space>
                      </Space>
                    </Col>
                    <Col span={12}>
                      <Space direction="vertical" size="small">
                        <Text type="secondary">Probability</Text>
                        <Text>{selectedOpportunity.probability}%</Text>
                      </Space>
                    </Col>
                    <Col span={24}>
                      <Space direction="vertical" size="small">
                        <Text type="secondary">Description</Text>
                        <Text>{selectedOpportunity.description}</Text>
                      </Space>
                    </Col>
                  </Row>
                </DetailsCard>

                <DetailsCard title="Stage History">
                  <StageTimeline>
                    {['Prospecting', 'Qualification', 'Proposal', 'Negotiation'].map((stage) => (
                      <Timeline.Item 
                        key={stage}
                        color={stage === selectedOpportunity.stage ? 'blue' : 'gray'}
                        dot={stage === selectedOpportunity.stage ? 
                          <ClockCircleOutlined style={{ fontSize: '16px' }} /> : null}
                      >
                        <Text strong={stage === selectedOpportunity.stage}>{stage}</Text>
                      </Timeline.Item>
                    ))}
                  </StageTimeline>
                </DetailsCard>
              </Col>

              <Col span={8}>
              <ReferenceManyResource<Contact>
      resource="contacts"
      id={selectedOpportunity.id}
      target='contactId'
    >
      {(contacts) => (
         	<DetailsCard title="Related Contacts">
                  <List
                    itemLayout="horizontal"
                    dataSource={contacts}
                    renderItem={(contact: Contact) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon={<UserOutlined />} src={contact.profileImage} />}
                          title={`${contact.firstName} ${contact.lastName}`}
                          description={contact.position}
                        />
                      </List.Item>
                    )}
                  />
                </DetailsCard>
      )}
    </ReferenceManyResource>

                <DetailsCard>
                  <NoteCard
                    targetEntity="opportunity"
                    id={selectedOpportunity.id}
                  />
                </DetailsCard>
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </>
  );
};

export default CompanyOpportunitiesTable;