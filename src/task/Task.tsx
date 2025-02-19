import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Form, Input, DatePicker, List, Typography, Tag, message, Select } from 'antd';
import { PlusOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Task, TaskTitle } from '../datagenerator/types/crmTypes';
import { Identifier, useCreate, useGetIdentity, useGetManyReference } from 'ra-core';

const { Text, Paragraph } = Typography;

// Replace hardcoded array with enum values
const taskTitleOptions = Object.values(TaskTitle);

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
     <Card title="Tasks"  style={{
     
         borderRadius: '8px',
         boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
         marginBottom: '16px',
     
      }}
      >

      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Add Task
      </Button>
     

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

      <List
        loading={isPending}
        dataSource={data}
        renderItem={(task: Task) => (
          <List.Item key={task.id} style={{ padding: '16px', borderBottom: '1px solid #e8e8e8' }}>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <Text strong>{task.title}</Text>
                {task.completed ? (
                  <Tag icon={<CheckCircleOutlined />} color="success">
                    Completed
                  </Tag>
                ) : (
                  <Tag icon={<ClockCircleOutlined />} color="processing">
                    In Progress
                  </Tag>
                )}
              </div>
              <Paragraph ellipsis={{ rows: 2 }}>{task.description}</Paragraph>
              <Text type="secondary">
                Due Date: {formatDate(task.dueDate)}
              </Text>
            </div>
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

    </Card>
  );
};

export default TaskCard;
