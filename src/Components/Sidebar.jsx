import React from "react";
import DonutChart from "react-donut-chart";

import { useTheme } from "../Contexts/ThemeContext";

import avatar from "../assets/avatar.png";
import info_img from "../assets/info_icon.png";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import './Sidebar.css'

const Sidebar = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth?.user?.username || "";
  const tasks = JSON.parse(localStorage.getItem(currentUser+"_tasks")) || [];
  const completedTasks = tasks.filter((task) => task.completed === true);
  const pendingTasks = tasks.filter((task) => task.completed !== true);
  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };
  return (
    <div
      className={`w-[25%] ${
        theme === "light" ? "bg-light-sidebar_bg" : "bg-dark-sidebar_bg"
      } px-4 mt-[8%]`}
    >
      <div className="flex items-center flex-col gap-1">
        <img src={avatar} alt="avatar" className="w-[50%] rounded-full -mt-[20%]" />
        <div className="flex gap-3">
          <span>Hey, ABCD</span>
          {
            auth.isAuthenticated && <button title="Logout" onClick={handleLogout}><i class="bi bi-box-arrow-left"></i></button>
          }
        </div>
      </div>

      <ul className={`text-xs rounded-sm px-3 py-1 mt-9 ${theme === "light" ? "text-light-sidebar_text bg-light-sidebar_tabs_bg" : "text-dark-sidebar_text bg-dark-sidebar_tabs_bg"}`}>
        <li className="pb-2 flex items-center mt-1 hover:bg-light-sidebar_selected_bg hover:rounded-sm pt-2 px-2 cursor-pointer">
          <i class="bi bi-journal-text" style={{fontSize: '0.91rem'}}></i>
          <span className="ml-3">All Tasks</span>
        </li>
        <li className="py-2 flex items-center hover:bg-light-sidebar_selected_bg hover:rounded-sm px-2 cursor-pointer">
          <i class="bi bi-calendar" style={{fontSize: '0.91rem'}}></i>
          <span className="ml-3">Today</span>
        </li>
        <li className="py-2 flex items-center hover:bg-light-sidebar_selected_bg hover:rounded-sm px-2 cursor-pointer">
          <i class="bi bi-star" style={{fontSize: '0.91rem'}}></i>
          <span className="ml-3">Important</span>
        </li>
        <li className="py-2 flex items-center hover:bg-light-sidebar_selected_bg hover:rounded-sm px-2 cursor-pointer">
          <i class="bi bi-map" style={{fontSize: '0.91rem'}}></i>
          <span className="ml-3">Planned</span>
        </li>
        <li className="pt-2 flex items-center mt-1 hover:bg-light-sidebar_selected_bg hover:rounded-sm px-2 pb-2 cursor-pointer">
          <i class="bi bi-person-fill-add" style={{fontSize: '0.91rem'}}></i>
          <span className="ml-3">Assigned To Me</span>
        </li>
      </ul>

      <div className={`flex items-center px-3 ${theme=='light' ? 'bg-light-sidebar_tabs_bg' : 'bg-dark-sidebar_tabs_bg'} mt-5 rounded-md py-5`}>
          <i class="bi bi-plus-lg ml-2" style={{fontSize: '1.3rem'}}></i>
          <span className="text-sm ml-3">Add List</span>
      </div>

      <div className={`flex flex-col ${theme=='light' ? 'bg-light-sidebar_tabs_bg' : 'bg-dark-sidebar_tabs_bg'} my-5 rounded-md py-5`}>
        <div className="flex justify-between px-3 py-2">
            <div className="flex flex-col">
                <span className="text-xs">Today Tasks</span>
                <span className="text-xl font-semibold">{completedTasks.length + pendingTasks.length}</span>
            </div>
            <span className="w-4"><img src={info_img} alt="info_icon" /></span>
        </div>
        <div className="flex w-full justify-center" >
            <DonutChart
                data={[
                    {
                        label: "Pending",
                        value: pendingTasks.length,
                    },
                    {
                        label: "Completed",
                        value: completedTasks.length,
                    }
                ]}
                colors={[
                    theme == 'light' ? '#3F9142' : '#3F9142',
                    theme == 'light' ? '#142E15' : '#A0EDA4'
                ]}
                className='donut-chart'
                strokeColor={theme == 'light' ? '#fff' : '#232323' }
                clickToggle={false}
                legend={false}
                innerRadius={0.6}
                outerRadius={0.8}
                interactive={false}
            ></DonutChart>
        </div>
        <div className="flex ml-6 mt-4">
            <div className="flex items-center">
                <span style={{height: '5px', width: '5px', background: '#3F9142', borderRadius: '50%'}}></span>
                <span className="text-xs ml-1">Pending</span>
            </div>
            <div className="flex items-center ml-4">
            <span
                style={{
                    height: '5px',
                    width: '5px',
                    background: theme === 'dark' ? '#A0EDA4' : '#142E15',
                    borderRadius: '50%',
                }}
                ></span>                
            <span className="text-xs ml-1">Completed</span>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
