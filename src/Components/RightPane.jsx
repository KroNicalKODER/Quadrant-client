import React, { useEffect, useState } from "react";
import { useTheme } from "../Contexts/ThemeContext";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import "./RightPane.css";

const RightPane = ({ task }) => {
    const auth = useSelector((state) => state.auth);
  useEffect(() => {
    const weekdayElements = document.getElementsByClassName(
      "react-calendar__month-view__weekdays__weekday"
    );
    for (let i = 0; i < weekdayElements.length; i++) {
      const abbr = weekdayElements[i].querySelector("abbr");
      if (abbr) {
        // Create a span element and copy the text from the abbr
        const span = document.createElement("span");
        span.textContent = abbr.textContent.charAt(0); // Keep only the first letter
        // Replace abbr with the span
        abbr.replaceWith(span);
      }
    }
  }, []);
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const Months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleDeleteTask = () => {
    // update the current task from localStorage
    const currentUser = auth.user.username
    const tasks = JSON.parse(localStorage.getItem(currentUser+"_tasks")) || [];
    const taskIndex = tasks.findIndex((_task) => _task.taskAssignDate === task.taskAssignDate);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      localStorage.setItem(currentUser+"_tasks", JSON.stringify(tasks));
      alert("Task deleted successfully!");
      location.reload();
    }
    setTask(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // update the current task from localStorage
    const currentUser = auth.user.username
    const tasks = JSON.parse(localStorage.getItem(currentUser+"_tasks")) || [];
    const taskIndex = tasks.findIndex((_task) => _task.taskAssignDate === task.taskAssignDate);
    if (taskIndex !== -1) {
      tasks[taskIndex].dueDate = date.toISOString().split("T")[0];
      localStorage.setItem(currentUser+"_tasks", JSON.stringify(tasks));
      alert("Task due date updated successfully!");
    }
    // update the task in the state
    
  };

  const tileContent = ({ date, view }) => {
    const weekdayElements = document.getElementsByClassName(
      "react-calendar__month-view__weekdays__weekday"
    );
    for (let i = 0; i < weekdayElements.length; i++) {
      const abbr = weekdayElements[i].querySelector("abbr");
      if (abbr) {
        // Create a span element and copy the text from the abbr
        const span = document.createElement("span");

        span.textContent = abbr.textContent.charAt(0); // Keep only the first letter
        // Replace abbr with the span
        abbr.replaceWith(span);
      }
    }
    const calendarNav = document.querySelector(".react-calendar__navigation");
    console.log(calendarNav);
  };

  return (
    <div
      className={`w-[45%] h-svh flex flex-col border ml-4 rounded-sm pt-8 px-4 text-xs right-pane ${
        theme == "light" ? "bg-light-sidebar_bg" : "bg-dark-sidebar_bg" 
      }`}
    >
      <hr className={`${theme=='light' ? 'bg-[#2F3630]' : 'bg-[#2F3630]'}`} />
      <div className="py-2 px-1 flex items-center gap-2">
        <input type="checkbox" name="" id="" />
        <span>{task.title}</span>
      </div>
      <hr className={`bg-[#2F3630]`} />
      <div className="py-2 px-1 flex items-center gap-2">
        <i className="bi bi-plus-lg"></i> <span>Add steps</span>
      </div>
      <hr className={`${theme=='light' ? 'bg-[#2F3630]' : 'bg-[#2F3630]'}`} />
      <div className="py-2 px-1 flex items-center gap-2">
        <i className="bi bi-bell"></i> <span>Set Remainder</span>
      </div>
      <hr className={`${theme=='light' ? 'bg-[#2F3630]' : 'bg-[#2F3630]'}`} />
      <div className="py-2 px-1 flex flex-col justify-center gap-2">
        <div className="flex gap-2">
          <i className="bi bi-calendar"></i> <span>Add Due Date</span>
        </div>
        <div
          className={`flex flex-col rounded-md px-5 py-2 text-[11px] ${
            theme == "light" ? "bg-light-background" : "bg-dark-background"
          }`}
        >
          <span className="text-[9px]">Select Date</span>
          <span className="text-[13px] font-[500] mt-3">
            {Days[selectedDate.getDay()]}, {Months[selectedDate.getMonth()]}{" "}
            {selectedDate.getDate().toString()}
          </span>
          <hr />
          <div className="mt-4 flex justify-center">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              showNeighboringMonth={false}
              tileContent={tileContent}
            />
          </div>
        </div>
      </div>
      <hr className={`${theme=='light' ? 'bg-[#2F3630]' : ''}`} />
      <div className="py-2 px-1 flex items-center gap-2">
        <i className="bi bi-repeat"></i> <span>Repeat</span>
      </div>
      <hr className={`${theme=='light' ? 'bg-[#2F3630]' : ''}`} />
        <div className="flex justify-between w-full align-super mt-[60%]">
          <i class="bi bi-x-lg"></i>
          <button onClick={handleDeleteTask}>
            <i class="bi bi-trash"></i>
          </button>
        </div>
    </div>
  );
};

export default RightPane;
