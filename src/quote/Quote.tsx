import React from 'react';
import { ListBase } from 'ra-core';
import QuoteList from './QuoteList';

const Quote: React.FC = () => {
  return (
    <ListBase resource="quotes">
      <QuoteList />
    </ListBase>
  );
};

export default Quote;