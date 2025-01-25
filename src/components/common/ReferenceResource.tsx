import React from 'react';
import { RaRecord, useGetOne } from 'ra-core';
import { Spin } from 'antd';
import { Identifier } from 'ra-core';

interface ReferenceResourceProps<T extends RaRecord = RaRecord> {
  resource: string;
  id: Identifier;
  children: (data: T) => React.ReactNode;
}

function ReferenceResource<T extends RaRecord>({ resource, id, children }: ReferenceResourceProps<T>) {
  const { data, isLoading } = useGetOne<T>(resource, { id });

  if (isLoading) return <Spin size="small" />;
  if (!data) return null;

  return <>{children(data)}</>;
}

export default ReferenceResource;