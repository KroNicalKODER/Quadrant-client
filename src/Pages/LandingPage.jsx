import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { register, login, logout } from "../redux/authSlice";
import Sidebar from "../Components/Sidebar";
import MainLanding from "../Components/MainLanding";
import LoginRegister from "../Components/LoginRegister";
import { useTheme } from "../Contexts/ThemeContext";
import { useSidebar } from "../Contexts/SidebarContext";
import themeJson from "../Constants/Themes.json";

const LandingPage = () => {
  const { theme } = useTheme();
  const { sidebar } = useSidebar();
  const dispatch = useDispatch();
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
