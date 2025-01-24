import { Table } from 'antd';
import { RaRecord } from 'ra-core';
import styled from 'styled-components';
import { TableProps } from 'antd/es/table';

export const StyledTable = <T extends RaRecord>() => styled(Table)<TableProps<T>>`
  .ant-table {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .ant-table-thead > tr > th {
    background: #fafafa;
    color: #1f1f1f;
    font-weight: 600;
    padding: 16px;
    border-bottom: 2px solid #f0f0f0;
  }

  .ant-table-tbody > tr > td {
    padding: 16px;
    transition: background 0.3s;
  }

  .ant-table-tbody > tr:hover > td {
    background: #f5f5f5;
  }

  .ant-table-row {
    cursor: pointer;
  }

  .ant-table-pagination {
    margin: 16px 0;
    display: flex;
    justify-content: flex-end;
  }

  .ant-table-column-sorter {
    color: #bfbfbf;
  }

  .ant-table-column-sorter-up.active,
  .ant-table-column-sorter-down.active {
    color: #1890ff;
  }

  .ant-table-tbody > tr.ant-table-row-selected > td {
    background: #e6f7ff;
  }
`;