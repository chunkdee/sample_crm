import React, { useState } from 'react';
import { ListBase } from 'ra-core';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, Typography, Tag, Avatar, Space, Statistic, Input, Button } from 'antd';
import { UserOutlined, DollarOutlined, CalendarOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useListContext, useUpdate } from 'ra-core';
import { Deal } from '../types/models';
import { Container, BoardContainer, Column, ColumnHeader, DealCard } from '../styles/DealStyles';
import { theme } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const dealStatuses = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

const statusColors: Record<string, string> = {
  'New': 'blue',
  'Qualified': 'cyan',
  'Proposal': 'orange',
  'Negotiation': 'purple',
  'Closed Won': 'green',
  'Closed Lost': 'red'
};

const DealsList: React.FC = () => {
  const navigate = useNavigate();
  const { data: deals, refetch, setFilters } = useListContext<Deal>();
  const [update] = useUpdate();
  const { token } = theme.useToken();
  const [searchText, setSearchText] = useState('');

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const dealId = result.draggableId;
    const newStatus = dealStatuses[result.destination.droppableId];

    try {
      await update(
        'deals',
        {
          id: dealId,
          data: { status: newStatus }
        }
      );
      refetch();
    } catch (error) {
      console.error('Failed to update deal status:', error);
    }
  };

  const groupedDeals = deals?.reduce((acc: Record<string, Deal[]>, deal: Deal) => {
    if (!acc[deal.status]) {
      acc[deal.status] = [];
    }
    acc[deal.status].push(deal);
    return acc;
  }, {});

  return (
    <Container>
      <div style={{ 
        marginBottom: 16, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/deals/create')}
        >
          Create Deal
        </Button>
        <Input
          placeholder="Search deals..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setFilters({ q: e.target.value });
          }}
          style={{ width: 200 }}
        />
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <BoardContainer>
          {dealStatuses.map((status, columnIndex) => (
            <Droppable key={status} droppableId={String(columnIndex)}>
              {(provided) => (
                <Column
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <ColumnHeader>
                    <Title level={5} style={{ color: 'black' }}>
                      {status}
                    </Title>
                    <Tag color={statusColors[status]}>
                      {groupedDeals?.[status]?.length || 0}
                    </Tag>
                  </ColumnHeader>

                  {groupedDeals?.[status]?.map((deal: Deal, index: number) => (
                    <Draggable 
                      key={deal.id} 
                      draggableId={String(deal.id)} 
                      index={index}
                    >
                      {(provided) => (
                        <DealCard
                          size="small"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Space direction="vertical" size={4} style={{ width: '100%' }}>
                            <Text strong style={{ fontSize: '12px' }}>{deal.name}</Text>
                            
                            <Space>
                              <DollarOutlined style={{ fontSize: '12px' }} />
                              <Statistic 
                                value={deal.value} 
                                precision={0} 
                                prefix="$"
                                valueStyle={{ fontSize: '12px' }}
                              />
                            </Space>

                            <Tag 
                              color={deal.probability >= 70 ? 'green' : deal.probability >= 40 ? 'orange' : 'red'}
                              style={{ fontSize: '11px', margin: 0 }}
                            >
                              {deal.probability}%
                            </Tag>
                          </Space>
                        </DealCard>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Column>
              )}
            </Droppable>
          ))}
        </BoardContainer>
      </DragDropContext>
    </Container>
  );
};

const Deals: React.FC = () => (
  <ListBase resource="deals">
    <DealsList />
  </ListBase>
);

export default Deals;