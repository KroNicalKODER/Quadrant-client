import React from "react";
import { useSelector } from "react-redux";

import Sidebar from "../Components/Sidebar";
import MainLanding from "../Components/MainLanding";
import LoginRegister from "../Components/LoginRegister";
import { useTheme } from "../Contexts/ThemeContext";
import { useSidebar } from "../Contexts/SidebarContext";

const LandingPage = () => {
  const { theme } = useTheme();
  const { sidebar } = useSidebar();
  const auth = useSelector((state) => state.auth);
  return (
    <div
      className={`flex px-10 ${
        theme == "light"
          ? "bg-light-background text-black"
          : "bg-dark-background text-dark-sidebar_text"
      } min-h-screen font-outfit `}
    >
      {sidebar && <Sidebar />}
      {
        auth.isAuthenticated ? 
            <MainLanding />
        :
            <LoginRegister />
      }
    </div>
  );
};

export default LandingPage;
