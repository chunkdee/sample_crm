import React from 'react';
import { ListBase } from 'ra-core';
import CustomersList from './CustomerList';

const Customers: React.FC = () => {
  return (
    <ListBase resource="customers">
      <CustomersList />
    </ListBase>
  );
};
export default Customers;
