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
import Contacts from './components/Contacts';
import Company from './components/Company';  // Update import path
import CompanyAdd from './components/CompanyAdd';  // Add this import
import Quote from './components/Quote';
import CustomLayout from './components/CustomLayout';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import './App.css';
import typography from './styles/typography';
import EditQuote from './components/EditQuote';
import CreateQuote from './components/CreateQuote';
import { lightTheme, darkTheme } from './styles/theme';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import ContactAdd from './components/ContactAdd';
import ContactView from './components/ContactView';
import Deals from './components/Deals';

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