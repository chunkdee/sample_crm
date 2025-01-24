import React, { useState } from 'react';
import { Table, Button, Radio, Card, Row, Col, message, Input, Form, Tooltip, Space, Avatar, Typography, List, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, UnorderedListOutlined, AppstoreOutlined, PhoneOutlined, MailOutlined, BankOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import { CanAccess, EditBase, Identifier, useIsAuthPending, useListContext } from 'ra-core';
import CustomModal from '../components/CustomModal';
import { Company, Contact } from '../types/models';
import type { ColumnType } from 'antd/es/table';
import { ViewToggle } from '../components/styles/ViewToggle';
import { ActionButton, ActionGroup } from '../components/styles/ActionButtons';
import { useNavigate } from 'react-router-dom';
import CreateButton from './common/CreateButton';
import EditButton from './common/EditButton';
import ViewButton from './common/ViewButton';

const ContactsList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [contactId, setContactId] = useState<Identifier | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchText, setSearchText] = useState<string>('');
  const navigate = useNavigate();

  const {
    data: records,
    isLoading,
    setFilters,
    total
  } = useListContext<Contact>();
  
  const companiesContext = useListContext<Company>();
  const companies = companiesContext.data || [];

  const contactsList = records || [];


  // Filtered contacts based on search
 
  const filteredContacts = contactsList.filter(contact => 
    searchText ? contact.name.toLowerCase().includes(searchText.toLowerCase()) : true
  );
  
  const contacts = filteredContacts;
  const columns: ColumnType<Contact>[] = [
    { 
      title: 'Name', 
      dataIndex: 'name', 
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string, record: Contact) => (
        <Space>
          <Avatar src={record.avatar} icon={!record.avatar && <UserOutlined />} />
          <Typography.Text>{name}</Typography.Text>
        </Space>
      )
    },
    { 
      title: 'Email', 
      dataIndex: 'email', 
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email)
    },
    { 
      title: 'Phone', 
      dataIndex: 'phone', 
      key: 'phone' 
    },
    { 
      title: 'Position', 
      dataIndex: 'position', 
      key: 'position',
      sorter: (a, b) => a.position.localeCompare(b.position)
    },
    { 
      title: 'Company', 
      dataIndex: 'companyId', 
      key: 'company',
      render: (companyId: number) => {
        const company = companies?.find(c => c.id === companyId);
        return company?.name || '-';
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Contact) => (
        <ActionGroup>
          <EditButton resource="contacts" recordId={record.id} />
          <ViewButton resource="contacts" recordId={record.id} />
          <Popconfirm
            title="Are you sure you want to delete this contact?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <Tooltip title="Delete Contact">
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
  };

  const handleDelete = (id: Identifier): void => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    message.success('Contact deleted successfully');
  };

  const handleEdit = (contactId: Identifier): void => {
     setContactId(contactId);
     setIsModalVisible(true);
  };


  const modalFields = [
    { name: 'name', label: 'Name', type: 'text', rules: [{ required: true }] },
    { name: 'email', label: 'Email', type: 'email', rules: [{ required: true, type: 'email' }] },
    { name: 'phone', label: 'Phone', type: 'text', rules: [{ required: true }] }
  ];


  return (
    <div>
      <div style={{ 
        marginBottom: 16, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Space size={16}>

        <CreateButton resource="contacts" />
           {/* <CanAccess action="create">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/contacts/create')}
            >
              Add Contact
            </Button>
          </CanAccess>  */}
          <Input
            placeholder="Search contacts..."
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
          dataSource={contacts} 
          rowKey="id" 
          pagination={{
            total,
            pageSize: 10
          }}
        />
      ) : (
        <Row gutter={[16, 16]}>
          {contacts.map((contact) => (
            <Col xs={24} sm={12} md={8} lg={6} key={contact.id}>
              <Card
                hoverable
                size="small"
                style={{ 
                  height: '100%',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                actions={[
                  <Tooltip title="View Contact">
                    <EyeOutlined key="view" onClick={() => navigate(`/contacts/${contact.id}`)} />
                  </Tooltip>,
                  <Tooltip title="Edit Contact">
                    <EditOutlined key="edit" onClick={() => handleEdit(contact.id)} />
                  </Tooltip>,
                  <Popconfirm
                    title="Are you sure you want to delete this contact?"
                    onConfirm={() => handleDelete(contact.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined key="delete" />
                  </Popconfirm>
                ]}
              >
                <div style={{ textAlign: 'center', padding: '12px 0' }}>
                  <Avatar 
                    src={contact.avatar} 
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
                    {contact.name}
                  </Typography.Title>
                  <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                    {contact.position}
                  </Typography.Text>
                </div>

                <List 
                  size="small" 
                  split={false}
                  style={{ fontSize: '12px' }}
                >
                  <List.Item>
                    <Space size={8}>
                      <MailOutlined style={{ color: '#1890ff', fontSize: '12px' }} />
                      <Typography.Text copyable style={{ fontSize: '12px' }}>
                        {contact.email}
                      </Typography.Text>
                    </Space>
                  </List.Item>
                  <List.Item>
                    <Space size={8}>
                      <PhoneOutlined style={{ color: '#52c41a', fontSize: '12px' }} />
                      <Typography.Text style={{ fontSize: '12px' }}>
                        {contact.phone}
                      </Typography.Text>
                    </Space>
                  </List.Item>
                  <List.Item>
                    <Space size={8}>
                      <BankOutlined style={{ color: '#722ed1', fontSize: '12px' }} />
                      <Typography.Text style={{ fontSize: '12px' }}>
                        {companies?.find(c => c.id === contact.companyId)?.name || '-'}
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
        <EditBase resource="contacts" id={contactId}>
        <CustomModal
          title="Contact"
          isModalVisible={true}
          handleCancel={handleCancel}
          fields={modalFields}
        />
        </EditBase>
      )}
    </div>
  );
};

export default ContactsList;