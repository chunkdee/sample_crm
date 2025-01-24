import React, { useState } from 'react';
import { Table, Button, Card, Row, Col, message, Input, Form, Tooltip, Space, Avatar, Typography, List, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, UnorderedListOutlined, AppstoreOutlined, UserOutlined, BankOutlined, TeamOutlined, EnvironmentOutlined, DollarOutlined } from '@ant-design/icons';
import { EditBase, Identifier, useListContext } from 'ra-core';
import CustomModal from '../components/CustomModal';
import { Company } from '../types/models';
import { ViewToggle } from '../components/styles/ViewToggle';
import { ActionButton, ActionGroup } from '../components/styles/ActionButtons';
import { ColumnProps } from 'antd/es/table';
import { TableColumn,createSortableColumn } from './tableColumnns';
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

  type Column<T> = {
    title: string;
    dataIndex?: keyof T;
    key: string;
    render?: (text: string, record: T) => React.ReactNode;
  }


  // const columns2: TableColumn<Company>[] = [
  //   createSortableColumn('Name', 'name'),
  //   createSortableColumn('Industry', 'industry'),
  //   createSortableColumn('Size', 'size'),
  //   createSortableColumn('Revenue', 'revenue', (a, b) => a.revenue - b.revenue),
  //   createSortableColumn('Location', 'location'),
  //   { 
  //     title: 'Logo',
  //     dataIndex: 'logo',
  //     key: 'logo',
  //     width: 80,
  //     render: (logo: string, record: Company) => (
  //       <Tooltip title={record.name}>
  //         <Avatar 
  //           src={logo}
  //           icon={!logo && <UserOutlined />}
  //           size={40}
  //           shape="square"
  //           style={{ 
  //             border: '1px solid #f0f0f0',
  //             backgroundColor: '#fff' 
  //           }}
  //         />
  //       </Tooltip>
  //     )
  //   },
  //   {
  //     title: 'Actions',
  //     key: 'actions',
  //     width: 120,
  //     render: (_: any, record: Company) => (
  //       <ActionGroup>
  //         <Tooltip title="Edit Company">
  //           <ActionButton
  //             icon={<EditOutlined />}
  //             onClick={() => {
  //               setCompanyId(record.id);
  //               setIsModalVisible(true);
  //             }}
  //           />
  //         </Tooltip>
  //         <Popconfirm
  //           title="Are you sure you want to delete this company?"
  //           onConfirm={() => handleDelete(record.id)}
  //           okText="Yes"
  //           cancelText="No"
  //           placement="left"
  //         >
  //           <Tooltip title="Delete Company">
  //             <ActionButton
  //               danger
  //               icon={<DeleteOutlined />}
  //             />
  //           </Tooltip>
  //         </Popconfirm>
  //       </ActionGroup>
  //     )
  //   }
  // ];

  const columns = [
    { 
      title: 'Name', 
      dataIndex: 'name', 
      key: 'name',
     sorter: (a: Company, b: Company) => a.name.localeCompare(b.name),
     render: (name: string, record: Company) => (
      <Space>
        <Avatar 
          src={record.logo}
          icon={!record.logo && <BankOutlined />}
        />
        <Typography.Text>{name}</Typography.Text>
      </Space>
    )
    },
    { 
      title: 'Industry', 
      dataIndex: 'industry', 
      key: 'industry' 
    },
    { 
      title: 'Size', 
      dataIndex: 'size', 
      key: 'size' 
    },
    { 
      title: 'Revenue', 
      dataIndex: 'revenue', 
      key: 'revenue',
      render: (revenue: number) => `$${revenue.toLocaleString()}`
    },
    { 
      title: 'Location', 
      dataIndex: 'location', 
      key: 'location' 
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: Company) => (
        <ActionGroup>
          <Tooltip title="Edit Company">
            <ActionButton
              icon={<EditOutlined />}
              onClick={() => {
                setCompanyId(record.id);
                setIsModalVisible(true);
              }}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this company?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <Tooltip title="Delete Company">
              <ActionButton
                danger
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </ActionGroup>
      )
    }
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
    <div>
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
                  transition: 'all 0.3s ease',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
                bodyStyle={{ padding: '12px' }}
                actions={[
                  <Tooltip title="Edit Company">
                    <EditOutlined key="edit" onClick={() => handleEdit(company.id)} />
                  </Tooltip>,
                  <Popconfirm
                    title="Delete this company?"
                    onConfirm={() => handleDelete(company.id)}
                  >
                    <DeleteOutlined key="delete" />
                  </Popconfirm>
                ]}
              >
                <div style={{ textAlign: 'center', padding: '8px 0' }}>
                  <Avatar 
                    src={company.logo} 
                    icon={!company.logo && <BankOutlined />}
                    size={48}
                    style={{ 
                      border: '2px solid #1890ff',
                      padding: '2px',
                      background: '#fff'
                    }}
                  />
                  <Typography.Title 
                    level={5} 
                    style={{ 
                      marginTop: '8px', 
                      marginBottom: '4px',
                      fontSize: '14px',
                      lineHeight: '1.2'
                    }}
                  >
                    {company.name}
                  </Typography.Title>
                  <Typography.Text 
                    type="secondary" 
                    style={{ 
                      fontSize: '12px',
                      display: 'block',
                      marginBottom: '8px'
                    }}
                  >
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
                      <Typography.Text style={{ fontSize: '12px' }}>
                        {company.size}
                      </Typography.Text>
                    </Space>
                  </List.Item>
                  <List.Item style={{ padding: '4px 0' }}>
                    <Space size={8}>
                      <DollarOutlined style={{ color: '#52c41a', fontSize: '12px' }} />
                      <Typography.Text style={{ fontSize: '12px' }}>
                        ${company.revenue.toLocaleString()}
                      </Typography.Text>
                    </Space>
                  </List.Item>
                  <List.Item style={{ padding: '4px 0' }}>
                    <Space size={8}>
                      <EnvironmentOutlined style={{ color: '#722ed1', fontSize: '12px' }} />
                      <Typography.Text style={{ fontSize: '12px' }}>
                        {company.location}
                      </Typography.Text>
                    </Space>
                  </List.Item>
                </List>
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
    </div>
  );
};

export default CompanyList;