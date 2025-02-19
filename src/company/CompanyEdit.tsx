import React from 'react';
import { Form, Input, Select, Upload, Card, Button, message } from 'antd';
import { 
  BankOutlined, 
  GlobalOutlined, 
  PhoneOutlined, 
  LoadingOutlined, 
  PlusOutlined,
  BuildOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { EditBase, useEditContext } from 'ra-core';
import { Company } from '../datagenerator/types/crmTypes';
import styled from '@emotion/styled';

const { TextArea } = Input;

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

const CompanyEditForm: React.FC = () => {
  const [form] = Form.useForm();
  const { record, save, isLoading } = useEditContext<Company>();
  const [logoUrl, setLogoUrl] = React.useState<string>(record?.logo);
  const [uploading, setUploading] = React.useState(false);

  React.useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
      setLogoUrl(record.logo);
    }
  }, [record, form]);

  const handleSubmit = async (values: Partial<Company>) => {
    try {
      if (!save) {
            throw new Error('Save function not available');
          }
      await save(values);
      message.success('Company updated successfully');
    } catch (error) {
      message.error('Error updating company');
    }
  };

  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload Logo</div>
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
          name="name"
          label="Company Name"
          rules={[{ required: true, message: 'Please input company name' }]}
        >
          <Input prefix={<BankOutlined />} placeholder="Company Name" />
        </Form.Item>

        <Form.Item
          name="industry"
          label="Industry"
          rules={[{ required: true, message: 'Please select industry' }]}
        >
          <Input prefix={<BuildOutlined />} placeholder="Industry" />
        </Form.Item>

        <Form.Item
          name="website"
          label="Website"
          rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
        >
          <Input prefix={<GlobalOutlined />} placeholder="Website URL" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
        >
          <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
        </Form.Item>
      </FormCard>

      <FormCard title="Additional Information">
        <Form.Item
          name="revenue"
          label="Annual Revenue"
        >
          <Input 
            prefix={<DollarOutlined />} 
            placeholder="Annual Revenue" 
            type="number"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <TextArea 
            rows={4} 
            placeholder="Company Description"
          />
        </Form.Item>
      </FormCard>

      <FormCard title="Company Logo">
        <Form.Item
          name="logo"
          label="Logo"
        >
          <Upload
            name="logo"
            listType="picture-card"
            className="logo-uploader"
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
                setLogoUrl(info.file.response.url);
              }
            }}
          >
            {logoUrl ? (
              <img src={logoUrl} alt="logo" style={{ width: '100%' }} />
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

const CompanyEdit: React.FC = () => {
  return (
    <EditBase resource="companies">
      <StyledCard title="Edit Company">
        <CompanyEditForm />
      </StyledCard>
    </EditBase>
  );
};

export default CompanyEdit;