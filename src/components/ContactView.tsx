import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Avatar, Typography, Timeline, List, Button, Input, Space, Tag, Divider, Spin, message, Steps, Empty } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, BankOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetOne, useUpdate, useGetList } from 'ra-core';
import { Contact, ContactNote } from '../types/models';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const dealStages = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'] as const;
const stageColors: Record<typeof dealStages[number], string> = {
  'New': '#1890ff',
  'Qualified': '#52c41a',
  'Proposal': '#faad14',
  'Negotiation': '#722ed1',
  'Closed Won': '#52c41a',
  'Closed Lost': '#ff4d4f'
};

const ContactView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: contact, isLoading, refetch } = useGetOne('contacts', { id });
  const { data: deals, isLoading: isLoadingDeal } = useGetList('deals', {
    filter: { contactId: id }
  });
  const [update] = useUpdate();
  const [newNote, setNewNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const deal = deals?.[0];

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    setSavingNote(true);
    try {
      const newNoteData: ContactNote = {
        id: Date.now(),
        content: newNote,
        date: new Date().toISOString(),
        contactId: Number(id)
      };

      await update(
        'contacts',
        {
          id,
          data: {
            ...contact,
            notes: [...(contact.notes || []), newNoteData]
          }
        }
      );

      setNewNote('');
      refetch();
      message.success('Note added successfully');
    } catch (error) {
      message.error('Failed to add note');
    } finally {
      setSavingNote(false);
    }
  };

  const getCurrentStageIndex = (status: string) => {
    return dealStages.indexOf(status as typeof dealStages[number]);
  };

  if (isLoading) return <Spin size="large" />;

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Avatar 
                size={80} 
                src={contact?.avatar}
                icon={!contact?.avatar && <UserOutlined />}
                style={{ 
                  backgroundColor: '#1890ff',
                  padding: 4,
                  border: '4px solid #e6f7ff'
                }}
              />
              <Title level={4} style={{ marginTop: 16, marginBottom: 4 }}>
                {contact?.name}
              </Title>
              <Text type="secondary">{contact?.position}</Text>
              
              <Divider />
              
              <List itemLayout="horizontal" split={false}>
                <List.Item>
                  <Space>
                    <MailOutlined style={{ color: '#1890ff' }} />
                    <Text copyable>{contact?.email}</Text>
                  </Space>
                </List.Item>
                <List.Item>
                  <Space>
                    <PhoneOutlined style={{ color: '#52c41a' }} />
                    <Text>{contact?.phone}</Text>
                  </Space>
                </List.Item>
                <List.Item>
                  <Space>
                    <BankOutlined style={{ color: '#722ed1' }} />
                    <Text>{contact?.company?.name}</Text>
                  </Space>
                </List.Item>
              </List>
            </div>
          </Card>
        </Col>

        <Col span={24}>
          <Card 
            title="Deal Pipeline" 
            size="small"
            bodyStyle={{ 
              padding: '12px',
              overflow: 'hidden'
            }}
          >
            {isLoadingDeal ? (
              <Spin />
            ) : deal ? (
              <>
                <Space direction="vertical" style={{ width: '100%', marginBottom: 4 }}>
                  <Text strong style={{ fontSize: '12px' }}>{deal.name}</Text>
                </Space>

                <Steps
                  current={getCurrentStageIndex(deal.status)}
                  size="small"
                  style={{ 
                    marginTop: 4,
                    width: '100%',
                    fontSize: '10px'
                  }}
                  items={dealStages.map((stage) => ({
                    title: <span style={{ 
                      fontSize: '10px', 
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '50px',
                      display: 'block'
                    }}>
                      {stage}
                    </span>,
                    status: stage === deal.status ? 'process' : 
                            getCurrentStageIndex(stage) < getCurrentStageIndex(deal.status) ? 'finish' : 'wait',
                    style: {
                      color: stage === deal.status ? stageColors[stage] : undefined
                    }
                  }))}
                  progressDot={(iconDot, { status }) => (
                    <span
                      style={{
                        backgroundColor: status === 'process' ? stageColors[deal.status as typeof dealStages[number]] : 
                                      status === 'finish' ? '#52c41a' : '#e8e8e8',
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                        display: 'inline-block'
                      }}
                    />
                  )}
                />
              </>
            ) : (
              <Empty 
                description={<Text style={{ fontSize: '12px' }}>No deal found</Text>}
                style={{ margin: '8px 0' }}
              />
            )}
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Notes">
            <div style={{ marginBottom: 16 }}>
              <TextArea 
                rows={4} 
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                placeholder="Add a note..."
              />
              <div style={{ marginTop: 8, textAlign: 'right' }}>
                <Button 
                  type="primary" 
                  onClick={handleAddNote}
                  loading={savingNote}
                  disabled={!newNote.trim()}
                >
                  Save Note
                </Button>
              </div>
            </div>

            <Timeline style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {contact?.notes?.map((note: ContactNote) => (
                <Timeline.Item key={note.id}>
                  <Card size="small" style={{ marginBottom: 8 }}>
                    <Paragraph>{note.content}</Paragraph>
                    <Text type="secondary">
                      {new Date(note.date).toLocaleString()}
                    </Text>
                  </Card>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Recent Activity" size="small">
            <Timeline>
              <Timeline.Item>Contact created - {new Date(contact?.createdAt).toLocaleString()}</Timeline.Item>
              <Timeline.Item>Profile updated - {new Date(contact?.updatedAt).toLocaleString()}</Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ContactView;