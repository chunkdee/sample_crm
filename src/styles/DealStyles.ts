import styled from 'styled-components';
import { Card } from 'antd';
import { useTheme } from '../contexts/ThemeContext';

export const Container = styled.div`
  padding: 12px;
  overflow-x: auto;
  max-width: 100%;
`;

export const BoardContainer = styled.div`
  display: flex;
  gap: 8px;
  min-height: calc(100vh - 200px);
  width: 100%;
`;

export const Column = styled.div`
  background: #f5f5f5;
  border-radius: 6px;
  flex: 1;
  min-width: 220px;
  max-width: 220px;
  padding: 8px;
  
  &:hover {
    background: #f0f0f0;
  }
`;

export const ColumnHeader = styled.div`
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h5 {
    margin: 0;
    font-size: 14px;
  }
`;

export const DealCard = styled(Card)`
  margin-bottom: 6px;
  cursor: pointer;
  
  .ant-card-body {
    padding: 8px;
  }

  .ant-space {
    gap: 4px !important;
  }

  .ant-statistic {
    .ant-statistic-content {
      font-size: 12px;
      line-height: 1;
    }
  }

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.09);
  }
`;