import React from 'react';
import { Modal, Form, Input, InputNumber, Select, DatePicker, Space } from 'antd';
import { Opportunity, OpportunityStage } from '../datagenerator/types/crmTypes';
import { useCreate, useGetList } from 'ra-core';
import styled from '@emotion/styled';
import { DollarOutlined, CalendarOutlined, PercentageOutlined } from '@ant-design/icons';

const StyledForm = styled(Form)`
  .ant-form-item-label {
    padding-bottom: 4px;
  }

  .ant-input-number-group-wrapper,
  .ant-input-number,
  .ant-picker,
  .ant-select {
    width: 100%;
    height: 40px;  // Make inputs taller
  }

  .ant-select-selector {
    height: 40px !important;  // Force height for Select components
    padding: 4px 11px !important;  // Adjust padding
  }

  .ant-select-selection-item {
    line-height: 30px !important;  // Center text vertically
  }

  .ant-input-number-input {
    height: 38px;  // Adjust input height
    padding: 4px 11px;
  }

  .ant-picker {
    padding: 4px 11px;
  }
`;

interface CreateOpportunityModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateOpportunityModal: React.FC<CreateOpportunityModalProps> = ({
  visible,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [create] = useCreate();

  // Add useGetList hook to fetch companies
  const { data: companies, isLoading: isLoadingCompanies } = useGetList('companies', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'name', order: 'ASC' }
  });

  const stages: OpportunityStage[] = [
    'Prospecting',
    'Qualification',
    'Proposal',
    'Negotiation',
    'Closed Won',
    'Closed Lost'
  ];

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await create(
        'opportunities',
        {
          data: {
            ...values,
            createdAt: new Date(),
            lastModified: new Date(),
          },
        }
      );
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error('Failed to create opportunity:', error);
    }
  };

  return (
    <Modal
      title="Create New Opportunity"
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      width={800}  // Increased modal width
      maskClosable={false}
      destroyOnClose
    >
      <StyledForm
        form={form}
        layout="vertical"
        initialValues={{
          probability: 50,
          stage: 'Prospecting',
        }}
      >
        <Form.Item
          name="name"
          label="Opportunity Name"
          rules={[{ required: true, message: 'Please enter opportunity name' }]}
        >
          <Input placeholder="Enter opportunity name" />
        </Form.Item>

        <Space style={{ width: '100%', gap: '32px' }}>  {/* Increased gap */}
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: 'Please enter amount' }]}
            style={{ width: '100%' }}  // Changed from 50% to 100%
          >
            <InputNumber
              prefix={<DollarOutlined />}
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '')}
              placeholder="Enter amount"
              size="large"  // Made input larger
            />
          </Form.Item>

          <Form.Item
            name="probability"
            label="Probability"
            rules={[{ required: true, message: 'Please enter probability' }]}
            style={{ width: '100%' }}  // Changed from 50% to 100%
          >
            <InputNumber
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value!.replace('%', '')}
              prefix={<PercentageOutlined />}
              style={{ width: '100%' }}
              size="large"  // Made input larger
            />
          </Form.Item>
        </Space>

        <Space style={{ width: '100%', gap: '32px' }}>  {/* Increased gap */}
          <Form.Item
            name="closeDate"
            label="Expected Close Date"
            rules={[{ required: true, message: 'Please select close date' }]}
            style={{ width: '100%' }}  // Changed from 50% to 100%
          >
            <DatePicker 
              format="YYYY-MM-DD"
              style={{ width: '100%' }}
              prefix={<CalendarOutlined />}
              size="large"  // Made input larger
            />
          </Form.Item>

          <Form.Item
            name="stage"
            label="Stage"
            rules={[{ required: true, message: 'Please select stage' }]}
            style={{ width: '100%' }}  // Changed from 50% to 100%
          >
            <Select 
              placeholder="Select stage"
              size="large"  // Made select larger
            >
              {stages.map(stage => (
                <Select.Option key={stage} value={stage}>
                  {stage}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Space>

        <Form.Item
          name="companyId"
          label="Company"
          rules={[{ required: true, message: 'Please select company' }]}
          style={{ width: '100%' }}  // Made full width
        >
          <Select
            placeholder={isLoadingCompanies ? 'Loading companies...' : 'Select company'}
            showSearch
            optionFilterProp="children"
            size="large"  // Made select larger
            loading={isLoadingCompanies}
            filterOption={(input, option) =>
              (option?.children as string).toLowerCase().includes(input.toLowerCase())
            }
          >
            {companies?.map(company => (
              <Select.Option key={company.id} value={company.id}>
                {company.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea 
            rows={4}
            placeholder="Enter opportunity description"
          />
        </Form.Item>
      </StyledForm>
    </Modal>
  );
};

export default CreateOpportunityModal;