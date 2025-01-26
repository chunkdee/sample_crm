import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CoreAdmin, Resource, CustomRoutes } from 'ra-core';
import { Route } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import dataProvider from './dataProvider'; // Adjust the path as necessary
import { authProvider } from './authProvider'; // Import authProvider
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Products from './components/Products';
import { Contacts, ContactView,ContactAdd } from './contact/index';
import Company from './company/Company';  // Update import path
import CompanyAdd from './company/CompanyAdd';  // Add this import
import Quote from './quote/Quote';  // Update import path
import CustomLayout from './components/CustomLayout';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import './App.css';
import EditQuote from './quote/EditQuote';
import CreateQuote from './quote/CreateQuote';
import { lightTheme, darkTheme } from './styles/theme';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import Deals from './deal/Deals';  // Update import path
import Opporturnity from './deal/Opportunity';  // Update import path

const AntAdminContent: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  const themeConfig = {
    ...isDarkMode ? darkTheme : lightTheme,
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <Router>
        <CoreAdmin 
            authProvider={authProvider}
          dataProvider={dataProvider} 
          layout={CustomLayout} 
          loginPage={LoginPage}
          dashboard={Dashboard}
        >
          <CustomRoutes>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </CustomRoutes>
          
          <Resource name="customers" list={Customers} />
          <Resource name="products" list={Products} />
          <Resource 
            name="contacts" 
            list={Contacts}
            create={ContactAdd}
            show={ContactView}
          />
          <Resource 
  name="companies" 
  list={Company}
  create={CompanyAdd}
/>
          <Resource 
            name="quotes" 
            list={Quote}
            edit={EditQuote}
            create={CreateQuote} 
          />
          <Resource 
            name="deals" 
            list={Deals}
          />
           <Resource 
            name="opportunities" 
            list={Opporturnity}
          />
        </CoreAdmin>
      </Router>
    </ConfigProvider>
  );
};

const AntAdmin: React.FC = () => {
  return (
    <ThemeProvider>
      <AntAdminContent />
    </ThemeProvider>
  );
};

export default AntAdmin;