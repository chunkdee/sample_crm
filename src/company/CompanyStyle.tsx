import styled from '@emotion/styled';
import { Card, List } from 'antd';

export const ProfileCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin-bottom: 24px;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  text-align: left;
`;

export const ProfileInfo = styled.div`
  margin-left: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CompanyDetails = styled(List)`
  display: flex;
  gap: 24px;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;

  .ant-list-item {
    margin: 0;
    padding: 0;
  }
`;

export const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  
  .ant-tabs-nav {
    margin-bottom: 16px;
  }

  .ant-tabs-tab {
    padding: 12px 16px;
    margin: 0 16px 0 0;
    font-size: 14px;
    transition: all 0.3s ease;

    &:hover {
      color: #1890ff;
    }
  }

  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: #1890ff;
      font-weight: 500;
    }
  }

  .ant-tabs-ink-bar {
    background: #1890ff;
    height: 3px;
    border-radius: 3px;
  }
`;

export const DetailsCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin-bottom: 4px;

  .ant-card-head {
    min-height: 35px;
    padding: 0 8px;
    
    .ant-card-head-title {
      padding: 6px 0;
      font-size: 14px;
    }
  }

  .ant-card-body {
    padding: 12px;
  }
`;

export const ContactChip = styled.div`
  display: inline-flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 16px;
  padding: 4px 12px;
  margin: 0 8px 8px 0;
  transition: all 0.3s ease;

  &:hover {
    background: #e6f7ff;
  }

  .ant-avatar {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    border: 1px solid #e8e8e8;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    
    .contact-name {
      font-size: 13px;
      line-height: 1.2;
    }
    
    .contact-position {
      font-size: 12px;
      color: #8c8c8c;
    }
  }
`;