import styled from '@emotion/styled';
import { Card, Space, Avatar, Table, List } from 'antd';
import { Contact } from '../datagenerator/types/crmTypes';

export const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  
  .ant-card-body {
    padding: 24px;
  }
`;

export const ContactCard = styled(Card)`
  border-radius: 10px;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    transform: translateY(-2px);
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 0 24px;
  border-bottom: 1px solid #f0f0f0;
`;

export const SearchSection = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const StyledTable = styled(Table<Contact>)`
  .ant-table-thead > tr > th {
    background: #fafafa;
    font-weight: 500;
    font-size: 14px;
    color: #262626;
    border-bottom: 1px solid #f0f0f0;
    padding: 14px 16px;
    transition: background 0.3s ease;

    &:hover {
      background: #f5f5f5;
    }
  }

  .ant-table-tbody > tr > td {
    padding: 12px 16px;
    transition: all 0.3s ease;
  }

  .ant-table-tbody > tr:hover > td {
    background: #f8faff;
  }

  .ant-table-row {
    cursor: pointer;
  }

  .ant-table-pagination {
    margin: 16px 0;
  }

  .ant-table-tbody > tr {
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #f8faff;
      
      td {
        background: #f8faff !important;
      }
    }
  }
`;

export const ActionButtons = styled(Space)`
  .ant-btn {
    padding: 4px 8px;
    height: 28px;
    
    &:hover {
      transform: translateY(-1px);
      transition: all 0.2s;
    }
  }
`;

export const ContactAvatar = styled(Avatar)`
  border: 2px solid #f0f0f0;
  background-color: #1890ff;
  margin-right: 12px;
`;

export const ContactName = styled.div`
  display: flex;
  align-items: center;

  .contact-details {
    display: flex;
    flex-direction: column;
    
    .secondary-text {
      font-size: 12px;
      color: #8c8c8c;
      margin-top: 2px;
    }
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .contact-details {
    display: flex;
    align-items: center;
  }

  .name-section {
    margin-left: 12px;
  }

  .company-section {
    padding-left: 52px;
    color: #595959;
  }
`;

// Add these new styled components for ContactView
export const ProfileCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin-bottom: 24px;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
`;

export const ProfileInfo = styled.div`
  margin-left: 24px;
  flex: 1;
`;

export const ContactDetails = styled(List)`
  display: flex;
  gap: 24px;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;

  .ant-list-item {
    margin: 0;
    padding: 0;
  }
`;

export const EditCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  
  .ant-card-body {
    padding: 24px;
  }
`;

export const FormCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 8px;
`;