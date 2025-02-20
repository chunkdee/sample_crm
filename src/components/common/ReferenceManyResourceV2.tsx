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

function ReferenceManyResourceV2<T extends RaRecord>({ resource, id, target, children }: ReferenceResourceProps<T>) {
  const referenceRespponse   = useGetManyReference<T>(
    `${resource}`,
     { target, id },
  );
 
  if (referenceRespponse.isLoading) return <Spin size="small" />;
  if (!referenceRespponse.data) return null;

  return <>{children(referenceRespponse)}</>;
}

export default ReferenceManyResource;