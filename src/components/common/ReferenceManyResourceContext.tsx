import React, { createContext } from 'react';
import { RaRecord, useGetManyReference} from 'ra-core';
import { Spin } from 'antd';
import { Identifier , useUpdate} from 'ra-core';
import { Opportunity } from '../../datagenerator/entity';



interface ReferenceResourceProps<T extends RaRecord = RaRecord> {
  resource: string;
  id: Identifier;
  target: string;
  children: (data: T[], total?:number) => React.ReactNode;
}

export const ReferenceManyResourceContext = createContext<UseGetManyReferenceHookValue<Opportunity>>(undefined);

export function ReferenceManyResourceV2<T extends RaRecord>({ resource, id, target, children }: ReferenceResourceProps<T>) {
  
  const referenceResponse   = useGetManyReference<T>(
    `${resource}`,
     { target, id },
  );

 
  if (referenceResponse.isLoading) return <Spin size="small" />;
  if (!referenceResponse.data) return null;


  return (
    <ReferenceManyResourceContext.Provider value={ referenceResponse }>
        {children}
   </ReferenceManyResourceContext.Provider>
      );
};
