import React from 'react';
import { ListBase } from 'ra-core';
import CompanyList from './CompanyList';

const Company: React.FC = () => {
  return (
    <ListBase resource="companies">
      <CompanyList />
    </ListBase>
  );
};

export default Company;