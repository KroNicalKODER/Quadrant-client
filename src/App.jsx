import React from "react";
import LandingPage from "./Pages/LandingPage";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Contexts/ThemeContext";
import { SidebarProvider } from "./Contexts/SidebarContext";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <SidebarProvider>
        <ThemeProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </ThemeProvider>
      </SidebarProvider>
    </Provider>
  );
};

export default App;
