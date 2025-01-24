import React, { createContext, useContext, useState } from 'react';

type SiderContextType = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

const SiderContext = createContext<SiderContextType | undefined>(undefined);

export const SiderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <SiderContext.Provider value={{ collapsed, toggleCollapsed }}>
      {children}
    </SiderContext.Provider>
  );
};

export const useSider = () => {
  const context = useContext(SiderContext);
  if (!context) {
    throw new Error('useSider must be used within SiderProvider');
  }
  return context;
};