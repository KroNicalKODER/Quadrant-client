import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(true); 

  const toggleSidebar = () => setSidebar((prev) => (prev === true ? false : true));

  return (
    <SidebarContext.Provider value={{ sidebar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
