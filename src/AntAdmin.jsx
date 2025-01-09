import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CoreAdmin, Resource } from 'ra-core';
import { ListGuesser } from 'ra-ui-materialui';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Products from './components/Products';
import Contacts from './components/Contacts';
import './App.css';
import dataProvider from './dataProvider';
import CustomLayout from './components/CustomLayout'; // Import the CustomLayout

function AntAdmin() {
    return (
        <Router>
            <CoreAdmin dataProvider={dataProvider} layout={CustomLayout} title="My Admin">
                <Resource name="customers" list={() => <Customers />} />
                <Resource name="products" list={() => <Products />} />
                <Resource name="contacts" list={() => <Contacts />} />
            </CoreAdmin>
        </Router>
    );
}

export default AntAdmin;
