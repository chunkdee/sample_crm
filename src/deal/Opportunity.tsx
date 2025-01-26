import React, { useState } from 'react';
import { ListBase } from 'ra-core';
import OpportunityList from './OpportunityList';

const Opportunities: React.FC = () => (
  <ListBase resource="opportunities">
    <OpportunityList />
  </ListBase>
);

export default Opportunities;