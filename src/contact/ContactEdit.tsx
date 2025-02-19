import React from 'react';
import { Form, Input, Select, Upload, Card, Button, message } from 'antd';
import { LoadingOutlined, PlusOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { EditBase, useEditContext, useGetList } from 'ra-core';
import { Contact, Company } from '../datagenerator/types/crmTypes';
import styled from '@emotion/styled';

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  
  .ant-card-body {
    padding: 24px;
  }
`;

const FormCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 8px;
`;


const ContactEdit: React.FC = () => {
    return (
      <EditBase resource="contacts">
        <StyledCard title="Edit Contact">
          <ContactEditForm />
        </StyledCard>
      </EditBase>
    );
  };

const ContactEditForm: React.FC = () => {
  const [form] = Form.useForm();
  const { record, save, isLoading } = useEditContext<Contact>();
  const { data: companies } = useGetList<Company>('companies');
  const [imageUrl, setImageUrl] = React.useState<string>(record?.profileImage || '');
  const [uploading, setUploading] = React.useState(false);

  React.useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
      setImageUrl(record.profileImage || '');
    }
  }, [record, form]);

  const handleSubmit = async (values: Partial<Contact>) => {
    try {
      if (!save) {
        throw new Error('Save function not available');
      }
      await save(values);
      message.success('Contact updated successfully');
    } catch (error) {
      message.error('Error updating contact');
    }
  };

  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload Photo</div>
    </div>
  );

  if (!record) return null;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <FormCard title="Basic Information">
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please input first name' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="First Name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please input last name' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Last Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item name="phone" label="Phone">
          <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
        </Form.Item>

        <Form.Item 
          name="position" 
          label="Position"
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Job Title or Position" 
          />
        </Form.Item>
      </FormCard>

      <FormCard title="Company Information">
        <Form.Item
          name="companyId"
          label="Company"
        >
          <Select
            showSearch
            placeholder="Select a company"
            optionFilterProp="children"
            options={companies?.map(company => ({
              value: company.id,
              label: company.name
            }))}
          />
        </Form.Item>
      </FormCard>

      <FormCard title="Profile Image">
        <Form.Item
          name="profileImage"
          label="Profile Image"
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith('image/');
              if (!isImage) {
                message.error('You can only upload image files!');
              }
              return isImage;
            }}
            onChange={(info) => {
              if (info.file.status === 'uploading') {
                setUploading(true);
                return;
              }
              if (info.file.status === 'done') {
                setUploading(false);
                setImageUrl(info.file.response.url);
              }
            }}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
      </FormCard>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          style={{ marginRight: 8 }}
        >
          Save Changes
        </Button>
        <Button onClick={() => window.history.back()}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};



export default ContactEdit;