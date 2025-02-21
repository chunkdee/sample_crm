import React, { useState } from 'react';
import { Space, Typography, Table, Tag, Modal, Card, Row, Col, Statistic, Timeline, List, Avatar, Divider } from 'antd';
import { DollarOutlined, CalendarOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useGetManyReference, Identifier } from 'ra-core';
import { Opportunity } from '../datagenerator/types/crmTypes';
import type { ColumnsType } from 'antd/es/table';
import styled from '@emotion/styled';
import NoteCard from '../note/Note';
import { Contact } from '../datagenerator/types/crmTypes';
import ReferenceManyResource from '../components/common/ReferenceManyResource';
import LifeCycleStages from '../components/common/LifecyleStages';
import { useUpdate } from 'ra-core';

const { Text, Title } = Typography;

const DetailsCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin-bottom: 4px;

  .ant-card-head {
    min-height: 35px;
    padding: 0 8px;
    
    .ant-card-head-title {
      padding: 6px 0;  // Reduced from default 16px
      font-size: 14px;
    }
  }

  .ant-card-body {
    padding: 12px;  // Reduced from default 24px
  }
`;

const ContactChip = styled.div`
  display: inline-flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 16px;
  padding: 4px 12px;
  margin: 0 8px 8px 0;
  transition: all 0.3s ease;

  &:hover {
    background: #e6f7ff;
  }

  .ant-avatar {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    border: 1px solid #e8e8e8;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    
    .contact-name {
      font-size: 13px;
      line-height: 1.2;
    }
    
    .contact-position {
      font-size: 12px;
      color: #8c8c8c;
    }
  }
`;

const CompanyOpportunitiesTable: React.FC<{ companyId: Identifier }> = ({ companyId }) => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [update] = useUpdate();

  const handleRowClick = (record: Opportunity) => {
    setSelectedOpportunity(record);
    setIsModalVisible(true);
  };

  // Handle stage click with data update
  const handleStageClick = async (stageId: OpportunityStage) => {
    try {
      if (!selectedOpportunity) return;

      // Only send required fields for update
      const updateData = {
        id: selectedOpportunity.id,
        stage: stageId,
        lastModified: new Date(),
        name: selectedOpportunity.name,
        amount: selectedOpportunity.amount,
        probability: selectedOpportunity.probability,
        closeDate: selectedOpportunity.closeDate,
        description: selectedOpportunity.description,
        companyId: selectedOpportunity.companyId
      };

      await update(
        'opportunities',
        { 
          id: selectedOpportunity.id,
          data: updateData
        }
      );
       
      refetch();
      // Update the local state with new stage
      setSelectedOpportunity(prev => prev ? { ...prev, stage: stageId } : null);

    } catch (error) {
      console.error('Failed to update opportunity stage:', error);
    }
  };

  const { data: opportunities, isLoading,refetch } = useGetManyReference<Opportunity>(
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
        style={{ top: 20 }}
        bodyStyle={{ 
          padding: '24px',
          maxHeight: 'calc(100vh - 100px)',
          overflow: 'auto'
        }}
      >
        {selectedOpportunity && (
          <>
            <Row gutter={[4, 4]}>
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

              <Col span={24}>
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
                    <Col span={24}>
                      <Divider style={{ margin: '12px 0' }} />
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <Text type="secondary">Related Contacts</Text>
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '8px' }}>
                          <ReferenceManyResource<Contact>
                            resource="contacts"
                            id={selectedOpportunity.id}
                            target='opportunities'
                          >
                            {(contacts) => contacts.map(contact => (
                              <ContactChip key={contact.id}>
                                <Avatar 
                                  size="small" 
                                  icon={<UserOutlined />} 
                                  src={contact.profileImage}
                                />
                                <div className="contact-info">
                                  <Text className="contact-name">
                                    {`${contact.firstName} ${contact.lastName}`}
                                  </Text>
                                  <Text className="contact-position">
                                    {contact.position}
                                  </Text>
                                </div>
                              </ContactChip>
                            ))}
                          </ReferenceManyResource>
                        </div>
                      </Space>
                    </Col>
                  </Row>
                </DetailsCard>

                <DetailsCard title="Pipeline Stage">
                  <LifeCycleStages 
                    opportunity={selectedOpportunity}
                    //onStageClick={handleStageClick}
                  />
                </DetailsCard>

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