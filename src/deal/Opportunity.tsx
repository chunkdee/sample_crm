import React, { useState } from 'react';
import { ListBase } from 'ra-core';
import OpportunityList from './OpportunityList';

const Opportunities: React.FC = () => (
  <ListBase resource="opportunities" perPage={1000}>
    <OpportunityList />
  </ListBase>
);

export default Opportunities;