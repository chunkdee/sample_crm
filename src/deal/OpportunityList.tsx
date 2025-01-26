import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Typography, Tag , Space, Statistic, Input, Button } from 'antd';
import {  DollarOutlined, PlusOutlined } from '@ant-design/icons';
import { useListContext, useUpdate } from 'ra-core';
import { Opportunity } from '../datagenerator/types/crmTypes';
import { Container, BoardContainer, Column, ColumnHeader, DealCard } from '../styles/DealStyles';
import { theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import {OpportunityStage} from '../datagenerator/types/crmTypes';

const { Title, Text } = Typography;

//const opportunityStatuses = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

const opportunityStageArray: OpportunityStage[] = [ 'Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost' ];

const statusColors: Record<string, string> = {
  'New': 'blue',
  'Qualified': 'cyan',
  'Proposal': 'orange',
  'Negotiation': 'purple',
  'Closed Won': 'green',
  'Closed Lost': 'red'
};

const OpportunityList: React.FC = () => {
  const navigate = useNavigate();
  const { data: opportunities, refetch, setFilters } = useListContext<Opportunity>();
  const [update] = useUpdate();
  const { token } = theme.useToken();
  const [searchText, setSearchText] = useState('');

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const opportunityId = result.draggableId;
    const newStage = opportunityStageArray[result.destination.droppableId];

    try {
      await update(
        'opportunities',
        {
          id: opportunityId,
          data: { stage: newStage }
        }
      );
      refetch();
    } catch (error) {
      console.error('Error updating opportunity stage:', error);
    }
  };

  const groupedOpportunities = opportunities?.reduce((acc: Record<string, Opportunity[]>, opportunity: Opportunity) => {
    if (!acc[opportunity.stage]) {
      acc[opportunity.stage] = [];
    }
    acc[opportunity.stage].push(opportunity);
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
          onClick={() => navigate('/opportunities/create')}
        >
          Create Opportunity
        </Button>
        <Input.Search
          placeholder="Search opportunities..."
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
          {opportunityStageArray.map((status, columnIndex) => (
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
                      {groupedOpportunities?.[status]?.length || 0}
                    </Tag>
                  </ColumnHeader>

                  {groupedOpportunities?.[status]?.map((opportunity: Opportunity, index: number) => (
                    <Draggable 
                      key={opportunity.id} 
                      draggableId={String(opportunity.id)} 
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
                            <Text strong style={{ fontSize: '12px' }}>{opportunity.name}</Text>
                            
                            <Space>
                              <DollarOutlined style={{ fontSize: '12px' }} />
                              <Statistic 
                                value={opportunity.value} 
                                precision={0} 
                                prefix="$"
                                valueStyle={{ fontSize: '12px' }}
                              />
                            </Space>

                            <Tag 
                              color={opportunity.probability >= 70 ? 'green' : opportunity.probability >= 40 ? 'orange' : 'red'}
                              style={{ fontSize: '11px', margin: 0 }}
                            >
                              {opportunity.probability}%
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

export default OpportunityList;