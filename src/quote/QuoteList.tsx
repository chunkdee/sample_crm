import React, { useState } from 'react';
import { Table, Button, Card, Space, Tag, Tooltip, Input, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PrinterOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useListContext } from 'ra-core';
import { useNavigate } from 'react-router-dom';
import { Quote, QuoteStatus } from '../types/models';
import { ActionButton, ActionGroup } from '../components/styles/ActionButtons';

const QuoteList: React.FC = () => {
  const navigate = useNavigate();
  const { data: records, isLoading, setFilters } = useListContext<Quote>();
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = useState<number | null>(null);

  const statusColors = {
    [QuoteStatus.Draft]: 'default',
    [QuoteStatus.Sent]: 'processing',
    [QuoteStatus.Accepted]: 'success',
    [QuoteStatus.Rejected]: 'error',
    [QuoteStatus.Expired]: 'warning'
  };

  const columns = [
    {
      title: 'Quote Number',
      dataIndex: 'number',
      key: 'number',
      sorter: (a: Quote, b: Quote) => a.number.localeCompare(b.number)
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toLocaleString()}`
    },
    {
      title: 'Valid Until',
      dataIndex: 'validUntil',
      key: 'validUntil',
      render: (date: Date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: QuoteStatus) => (
        <Tag color={statusColors[status]}>{status}</Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Quote) => (
        <ActionGroup>
          <Tooltip title="Edit Quote">
            <ActionButton
              icon={<EditOutlined />}
              onClick={() => navigate(`/quotes/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="Print Quote">
            <ActionButton
              icon={<PrinterOutlined />}
              onClick={() => console.log('Print quote', record.id)}
            />
          </Tooltip>
          <Tooltip title="Delete Quote">
            <ActionButton
              danger
              icon={<DeleteOutlined />}
              onClick={() => console.log('Delete quote', record.id)}
            />
          </Tooltip>
        </ActionGroup>
      )
    }
  ];

  return (
    <Card>
      <div style={{ 
        marginBottom: 16, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Space size={16}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/quotes/create')}
          >
            Create Quote
          </Button>
          <Input
            placeholder="Search quotes..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setFilters({ q: e.target.value });
            }}
            style={{ width: 200 }}
          />
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={records}
        loading={isLoading}
        rowKey="id"
        pagination={{
          total: records?.length,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`
        }}
      />
    </Card>
  );
};

export default QuoteList;