import React from 'react';
import { ShowBase } from 'ra-core';
import CompanyView from './CompanyView';

const CompanyShow = () => (
  <ShowBase resource="companies" >
    <CompanyView />
  </ShowBase>
);

export default CompanyShow;