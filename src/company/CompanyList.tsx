import React, { useState } from 'react';
import { Table, Button, Card, Row, Col, message, Input, Form, Tooltip, Space, Avatar, Typography, List, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, UnorderedListOutlined, AppstoreOutlined, UserOutlined, BankOutlined, TeamOutlined, EnvironmentOutlined, DollarOutlined } from '@ant-design/icons';
import { EditBase, Identifier, useListContext } from 'ra-core';
import { Company } from '../datagenerator/types/crmTypes';
import { ViewToggle } from '../components/styles/ViewToggle';
import { ActionButton, ActionGroup } from '../components/styles/ActionButtons';
import type { ColumnType } from 'antd/es/table';
import CustomModal from '../components/CustomModal';
import ViewButton from '../components/common/ViewButton';
import EditButton from '../components/common/EditButton';
import DeleteButton from '../components/common/DeleteButton';

const { Text } = Typography;

const columns: ColumnType<Company>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (_, record: Company) => (
      <Space>
        <Avatar 
          src={record.logo} 
          icon={!record.logo && <BankOutlined />}
        />
        <Text>{record.name}</Text>
      </Space>
    )
  },
  {
    title: 'Industry',
    dataIndex: 'industry',
    key: 'industry',
    sorter: (a, b) => a.industry.localeCompare(b.industry)
  },
  {
    title: 'Open Deal Amount',
    dataIndex: 'dealAmount',
    key: 'dealAmount'
  },
  {
    title: 'Related Contacts',
    dataIndex: 'relatedcontacts',
    key: 'relatedcontacts'
  },
  {
    title: 'Actions',
    key: 'actions',
    width: '10%',
    render: (_, record: Company) => (
      <ActionGroup>
        <ViewButton resource="companies" recordId={record.id} />
        <EditButton resource="companies" recordId={record.id} />
        <DeleteButton resource="companies" recordId={record.id} />
      </ActionGroup>
    )
  }
];

const gridStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  marginBottom: '8px',
  cursor: 'pointer',
  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
};

const CardView: React.FC<{ company: Company }> = ({ company }) => (
  <Card.Grid 
    style={gridStyle}
    hoverable
  >
    <Space direction="vertical" size="small" style={{ width: '100%' }}>
      <Space>
        <Avatar 
          size={48}
          src={company.logo} 
          icon={!company.logo && <BankOutlined />}
          style={{ 
            border: '2px solid #1890ff',
            padding: '2px',
            background: '#fff'
          }}
        />
        <div>
          <Text strong style={{ fontSize: '14px' }}>{company.name}</Text>
          <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>
            {company.industry}
          </Text>
        </div>
      </Space>
      
      <List 
        size="small" 
        split={false}
        style={{ fontSize: '12px' }}
      >
        <List.Item style={{ padding: '4px 0' }}>
          <Space size={8}>
            <TeamOutlined style={{ color: '#1890ff', fontSize: '12px' }} />
            <Text style={{ fontSize: '12px' }}>{company.size}</Text>
          </Space>
        </List.Item>
        <List.Item style={{ padding: '4px 0' }}>
          <Space size={8}>
            <DollarOutlined style={{ color: '#52c41a', fontSize: '12px' }} />
            <Text style={{ fontSize: '12px' }}>
              {company.revenue ? `$${company.revenue.toLocaleString()}` : '-'}
            </Text>
          </Space>
        </List.Item>
        <List.Item style={{ padding: '4px 0' }}>
          <Space size={8}>
            <EnvironmentOutlined style={{ color: '#722ed1', fontSize: '12px' }} />
            <Text style={{ fontSize: '12px' }}>{company.location}</Text>
          </Space>
        </List.Item>
      </List>

      <ActionGroup>
        <ViewButton resource="companies" recordId={company.id} />
        <EditButton resource="companies" recordId={company.id} />
        <DeleteButton resource="companies" recordId={company.id} />
      </ActionGroup>
    </Space>
  </Card.Grid>
);

const CompanyList: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [companyId, setCompanyId] = useState<Identifier | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchText, setSearchText] = useState<string>('');

  const {
    data: records,
    isLoading,
    setFilters,
    total
  } = useListContext<Company>();

  const companiesList = records || [];

  const filteredCompanies = companiesList.filter(company =>
    searchText ? company.name.toLowerCase().includes(searchText.toLowerCase()) : true
  );

  const companies = filteredCompanies;

  const modalFields = [
    { name: 'name', label: 'Name', type: 'text', rules: [{ required: true }] },
    { name: 'industry', label: 'Industry', type: 'text', rules: [{ required: true }] },
    { name: 'size', label: 'Size', type: 'text', rules: [{ required: true }] },
    { name: 'revenue', label: 'Revenue', type: 'number', rules: [{ required: true }] },
    { name: 'location', label: 'Location', type: 'text', rules: [{ required: true }] },
  ];

  const handleCancel = () => {
    setIsModalVisible(false);
    setCompanyId(null);
  };

  const handleDelete = (id: Identifier): void => {
    const updatedCompany = companies.filter((company) => company.id !== id);
    message.success('Company deleted successfully');
  };

  function handleEdit(id: Identifier): void {
    setCompanyId(id);
    setIsModalVisible(true);
  }

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
            onClick={() => navigate('/companies/create')}
          >
            Add Company
          </Button>
          <Input
            placeholder="Search companies..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setFilters({ q: e.target.value });
            }}
            style={{ width: 200 }}
          />
        </Space>

        <ViewToggle>
          <Tooltip title="Table View">
            <div
              className={`view-button ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              <UnorderedListOutlined />
            </div>
          </Tooltip>
          <Tooltip title="Card View">
            <div
              className={`view-button ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
            >
              <AppstoreOutlined />
            </div>
          </Tooltip>
        </ViewToggle>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : viewMode === 'table' ? (
        <Table
          columns={columns}
          dataSource={companies}
          rowKey="id"
          pagination={{
            total,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
          }}
        />
      ) : (
        <Row gutter={[16, 16]}>
          {companies.map((company) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={company.id}>
              <Card
                hoverable
                size="small"
                style={{ 
                  height: '100%',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ textAlign: 'center', padding: '12px 0' }}>
                  <Avatar 
                    src={company.logo} 
                    icon={!company.logo && <BankOutlined />}
                    size={60}
                    style={{ 
                      border: '2px solid #1890ff',
                      padding: '2px',
                      background: '#fff'
                    }}
                  />
                  <Typography.Title level={5} style={{ 
                    marginTop: '8px', 
                    marginBottom: '4px',
                    fontSize: '14px'
                  }}>
                    {company.name}
                  </Typography.Title>
                  <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                    {company.industry}
                  </Typography.Text>
                </div>

                <List 
                  size="small" 
                  split={false}
                  style={{ fontSize: '12px' }}
                >
                  <List.Item style={{ padding: '4px 0' }}>
                    <Space size={8}>
                      <TeamOutlined style={{ color: '#1890ff', fontSize: '12px' }} />
                      <Text style={{ fontSize: '12px' }}>{company.size}</Text>
                    </Space>
                  </List.Item>
                  <List.Item style={{ padding: '4px 0' }}>
                    <Space size={8}>
                      <DollarOutlined style={{ color: '#52c41a', fontSize: '12px' }} />
                      <Text style={{ fontSize: '12px' }}>
                        {company.revenue ? `$${company.revenue.toLocaleString()}` : '-'}
                      </Text>
                    </Space>
                  </List.Item>
                  <List.Item style={{ padding: '4px 0' }}>
                    <Space size={8}>
                      <EnvironmentOutlined style={{ color: '#722ed1', fontSize: '12px' }} />
                      <Text style={{ fontSize: '12px' }}>{company.location}</Text>
                    </Space>
                  </List.Item>
                </List>

                <ActionGroup>
                  <ViewButton resource="companies" recordId={company.id} />
                  <EditButton resource="companies" recordId={company.id} />
                  <DeleteButton resource="companies" recordId={company.id} />
                </ActionGroup>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {isModalVisible && (
        <EditBase resource="companies" id={companyId}>
          <CustomModal
            title="Company"
            isModalVisible={true}
            handleCancel={handleCancel}
            fields={modalFields}
          />
        </EditBase>
      )}
    </Card>
  );
};

export default CompanyList;