import React from 'react';
import { ListBase } from 'ra-core';
import ContactsList from './ContactList';

const Contacts: React.FC = () => {
  return (
    <ListBase resource="contacts">
      <ContactsList />
    </ListBase>
  );
};

export default Contacts;


