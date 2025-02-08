import React from 'react';
import { RaRecord, useGetManyReference} from 'ra-core';
import { Spin } from 'antd';
import { Identifier } from 'ra-core';

interface ReferenceResourceProps<T extends RaRecord = RaRecord> {
  resource: string;
  id: Identifier;
  target: string;
  children: (data: T[], total?:number) => React.ReactNode;
}

function ReferenceManyResource<T extends RaRecord>({ resource, id, target, children }: ReferenceResourceProps<T>) {
  const { data, isLoading , total} = useGetManyReference<T>(
    `${resource}`,
     { target, id },
  );
 
  if (isLoading) return <Spin size="small" />;
  if (!data) return null;

  return <>{children(data, total)}</>;
}

export default ReferenceManyResource;