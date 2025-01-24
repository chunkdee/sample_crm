import styled from 'styled-components';

export const ViewToggle = styled.div`
  display: flex;
  gap: 8px;
  
  .view-button {
    padding: 8px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    transition: all 0.3s;
    
    &:hover {
      color: #1890ff;
      border-color: #1890ff;
    }
    
    &.active {
      background: #e6f7ff;
      color: #1890ff;
      border-color: #1890ff;
    }

    svg {
      font-size: 20px;
    }
  }
`;