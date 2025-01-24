import styled from 'styled-components';
import { Button } from 'antd';

export const ActionButton = styled(Button)`
  border: none;
  background: transparent;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.3s;

  &:hover {
    background: ${props => props.danger ? 'rgba(255, 77, 79, 0.1)' : 'rgba(24, 144, 255, 0.1)'};
    color: ${props => props.danger ? '#ff4d4f' : '#1890ff'};
  }

  &:active {
    background: ${props => props.danger ? 'rgba(255, 77, 79, 0.2)' : 'rgba(24, 144, 255, 0.2)'};
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding: 8px;
`;