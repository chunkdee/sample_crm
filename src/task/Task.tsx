import React from 'react';
import { Button, Card, Modal, Form, Input, DatePicker, List, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Task } from '../datagenerator/types/crmTypes';
import { Identifier, ListBase, useCreate, useGetIdentity, useGetManyReference, useListController } from 'ra-core';

const { Text } = Typography;

interface TaskComponentProps {
  targetEntity: string;
  id: Identifier;
}

const TaskCard: React.FC<TaskComponentProps>  = ({ targetEntity, id }) => {
 
  const { data:userData,isPending:isLoadingCache} = useGetIdentity();
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [create, {isLoading }] = useCreate<Task>('tasks');

  
  const {data , isPending , error , refetch} = useGetManyReference<Task>('tasks', {
        target: `${targetEntity}Id`,
        id: id,
        sort: { field: 'createdAt', order: 'DESC' }
        });


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  
  const handleOk = async (values: Task) => {

    await create('tasks',
      {
        data: {
          title: values.title,
          description: values.description,
          dueDate: values.dueDate,
          completed: false,
        },
      },
      {
        onSuccess: () => {
          refetch();
          setIsModalVisible(false);
        },

        onError: (error : any) => {
          console.error("Error creating task:", error);
        },
      }
    );
  };

  return (

    <Card
    title="Create Task"
    style={{ width: 400, margin: '20px auto' }}
    >
    <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Create Task
    </Button>

      <Modal
        title="Create Task"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" htmlType="submit" form="taskForm" loading={isLoading}>
            Create
          </Button>,
        ]}
      >
        <Form id="taskForm" onFinish={handleOk}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please select the due date!' }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
  
      <List
            loading={isLoading}
            dataSource={data}
            renderItem={(task: Task) => (
              <List.Item>
                 <Card
                  title={task.title}
                  style={{ width: '100%', marginBottom: '16px' }}
                >
                  <Text>{task.description}</Text>
                  <Text type="secondary">Due Date: {task.dueDate.toLocaleDateString()}</Text>
                </Card>
              </List.Item>
            )}
          />
      
    </Card>
  );
};

export default TaskCard;
