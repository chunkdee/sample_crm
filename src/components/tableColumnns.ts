import React from 'react';
import { RaRecord } from 'ra-core';
import { ColumnType } from 'antd/es/table';
import { Avatar } from 'antd';

export type TableColumn<T extends RaRecord> = ColumnType<T> & {
  title: string;
  dataIndex?: keyof T | any;
  key: string;
  render?: (value: any, record: T) => React.ReactNode;
  sorter?: (a: T, b: T) => number;
  width?: number | string;
};

export const createSortableColumn = <T extends RaRecord>(
  title: string,
  dataIndex: keyof T | any,
  sorter?: (a: T, b: T) => number
): TableColumn<T> => ({
  title,
  dataIndex,
  key: String(dataIndex),
  sorter: sorter || ((a: T, b: T) => {
    const aVal = a[dataIndex];
    const bVal = b[dataIndex];
    return String(aVal).localeCompare(String(bVal));
  })
});

// export const createImageColumn = <T extends RaRecord>(
//   title: string,
//   dataIndex: dataIndex<T>,
//   width: number = 80
// ): TableColumn<T> => ({
//   title,
//   dataIndex,
//   key: String(dataIndex),
//   width,
//   render: (value: any, record: T) => {
//     return <Avatar src={value} />;
//   }
// });