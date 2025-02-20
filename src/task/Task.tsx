import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Form, Input, DatePicker, List, Typography, Tag, message, Select } from 'antd';
import { PlusOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Task, TaskTitle as titleOptions } from '../datagenerator/types/crmTypes';
import { Identifier, useCreate, useGetIdentity, useGetManyReference } from 'ra-core';
import styled from '@emotion/styled';

const { Text, Paragraph } = Typography;

// Replace hardcoded array with enum values
const taskTitleOptions = Object.values(titleOptions);

interface TaskComponentProps {
  targetEntity: string;
  id: Identifier;
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

const TaskWrapper = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  
  .ant-card-head {
    min-height: 48px;
    padding: 0 16px;
    border-bottom: 1px solid #f0f0f0;
  }

  .ant-card-head-title {
    padding: 12px 0;
    font-size: 16px;
    font-weight: 500;
  }

  .ant-card-body {
    padding: 16px;
  }
`;

const TaskList = styled(List)`
  .ant-list-item {
    padding: 8px 0; // Reduced from 12px
    border-bottom: 1px solid #f5f5f5;
    transition: all 0.3s ease;

    &:hover {
      background-color: #fafafa;
    }
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const TaskItem = styled.div`
  width: 100%;
`;

const TaskTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px; // Reduced from 8px
`;

const TaskDescription = styled(Paragraph)`
  margin-bottom: 4px;
  color: #666;
  font-size: 13px; // Reverted from 12px
  line-height: 1.5;
`;

const TaskDate = styled(Text)`
  font-size: 12px; // Reverted from 11px
  color: #8c8c8c;
`;

const AddTaskButton = styled(Button)`
  margin-bottom: 16px;
  font-size: 13px;
  height: 32px;
  padding: 4px 12px;
  
  .anticon {
    font-size: 12px;
  }
  
  &.ant-btn-primary {
    background: #1890ff;
    box-shadow: 0 2px 4px rgba(24,144,255,0.1);
    
    &:hover {
      background: #40a9ff;
      transform: translateY(-1px);
    }
  }
`;

const TaskCard: React.FC<TaskComponentProps> = ({ targetEntity, id }) => {

  const { data:userData,isPending:isLoadingCache} = useGetIdentity();
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [IsNewTask, setIsNewTask] = React.useState<boolean>(false);
  const [create, { isLoading }] = useCreate<Task>('tasks');
  const [itemsToShow, setItemsToShow] = useState(5);

  const { data, isPending , refetch } = useGetManyReference<Task>('tasks', {
    target: `${targetEntity}Id`,
    id: id,
    pagination: { page: 1, perPage: itemsToShow },
    sort: { field: 'createdAt', order: 'DESC' },
  });


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async (values: Task) => {

    await create(
      'tasks',
      {
        data: {
          [targetEntity + 'Id']: id,
          title: values.title,
          description: values.description,
          dueDate: values.dueDate,
          completed: false,
        },
      },
      {
        onSuccess: () => {
        //  setIsNewTask(true)
           refetch();
          setIsModalVisible(false);
          message.success('Task created successfully!');
        },
        onError: (error: any) => {
          console.error('Error creating task:', error);
          message.error('Failed to create task.');
        },
      }
    );
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
     <TaskWrapper title="Tasks">
      <TaskHeader>
        <AddTaskButton
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          size="small"
        >
          Add Task
        </AddTaskButton>
      </TaskHeader>

      <Modal
        title="Create New Task"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="taskForm"
            loading={isLoading}
          >
            Create
          </Button>,
        ]}
      >
        <Card>
          <Form
            id="taskForm"
            onFinish={handleOk}
            layout="vertical"
            initialValues={{ completed: false }}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please select the task type!' }]}
            >
              <Select
                placeholder="Select task type"
                style={{ width: '100%' }}
              >
                {taskTitleOptions.map(title => (
                  <Select.Option key={title} value={title}>
                    {title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: 'Please enter the description!' },
              ]}
            >
              <Input.TextArea
                placeholder="Enter task description"
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </Form.Item>
            <Form.Item
              name="dueDate"
              label="Due Date"
              rules={[{ required: true, message: 'Please select the due date!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        </Card>
      </Modal>

      <TaskList
        loading={isPending}
        dataSource={data}
        renderItem={(task: Task) => (
          <List.Item key={task.id}>
            <TaskItem>
              <TaskTitle>
                <Text strong style={{ fontSize: '14px' }}>{task.title}</Text> {/* Reverted from 13px */}
                {task.completed ? (
                  <Tag icon={<CheckCircleOutlined />} color="success" style={{ margin: 0, fontSize: '12px', padding: '0 6px' }}> {/* Reverted from 11px */}
                    Completed
                  </Tag>
                ) : (
                  <Tag icon={<ClockCircleOutlined />} color="processing" style={{ margin: 0, fontSize: '12px', padding: '0 6px' }}> {/* Reverted from 11px */}
                    In Progress
                  </Tag>
                )}
              </TaskTitle>
              <TaskDescription ellipsis={{ rows: 2 }}>
                {task.description}
              </TaskDescription>
              <TaskDate type="secondary">
                Due: {formatDate(task.dueDate)}
              </TaskDate>
            </TaskItem>
          </List.Item>
        )}
      />

      {data && data.length >= itemsToShow && (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Button 
            type="text"
            onClick={() => setItemsToShow(prev => prev + 10)}
            loading={isPending}
          >
            View More
          </Button>
        </div>
      )}

    </TaskWrapper>
  );
};

export default TaskCard;
