import React from 'react';
import { ShowBase } from 'ra-core';
import ContactView from './ContactView';

const ContactShow = () => (
  <ShowBase resource="contacts" >
    <ContactView />
  </ShowBase>
);

export default ContactShow;