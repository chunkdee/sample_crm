import React, { useState } from 'react';
import { ListBase } from 'ra-core';
import DealsList from './DealList';

const Deals: React.FC = () => (
  <ListBase resource="deals">
    <DealsList />
  </ListBase>
);

export default Deals;