import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useEditContext } from 'ra-core';

interface Contact {
  id?: number;
  name: string;
  email: string;
  phone: string;
}

interface CustomModalProps {
  title: string;
  isModalVisible: boolean;
  handleCancel: () => void;
  fields: Array<{
    name: string;
    label: string;
    type: string;
    rules?: any[];
  }>;
   mode?: 'edit' | 'add';
}

const CustomModal: React.FC<CustomModalProps> = ({
  title,
  isModalVisible,
  handleCancel,
  fields,
  mode
}) => {
  const [form] = Form.useForm<Contact>();
  const editFormContext = useEditContext() 

  React.useEffect(() => {
    if (editFormContext.record) {
      form.setFieldsValue(editFormContext.record);
    } else {
      form.resetFields();
    }
  }, [editFormContext.record, form]);


  const saveHandler = async (values: Contact) => {
    try {
      await editFormContext.save?.(values);
      message.success('Contact saved successfully');
      handleCancel();
      form.resetFields();
    } catch (error) {
      message.error('Error saving contact');
    }
  };

  return (
    <Modal
      title= {editFormContext.defaultTitle? editFormContext.defaultTitle : 'Add' }//{`${editingRecord ? 'Edit' : 'Add'} ${title}`}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        onFinish={saveHandler}
        layout="vertical"
        initialValues={editFormContext?.record || {}}
      >
        {fields.map(field => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={field.rules}
          >
            <Input type={field.type} />
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editFormContext.record ? 'Update' : 'Add'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomModal;