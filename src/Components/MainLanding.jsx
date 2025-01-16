import React, { useState } from "react";
import { useTheme } from "../Contexts/ThemeContext";
import themeJson from "../constants/Themes.json";
import { useSelector } from "react-redux";
import RightPane from "./RightPane";

const MainLanding = () => {
  const { theme } = useTheme();
  const auth = useSelector((state) => state.auth);

  //GET THE CURRENT USERNAME
  const currentUser = auth.user.username;

  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  // Getting all the tasks if present in localstorage
  const [allTasks, setAllTasks] = useState(
    JSON.parse(localStorage.getItem(currentUser + "_tasks")) || []
  );

  const handleAddTask = () => {
    if (taskTitle === "") {
      alert("Please enter a task title");
      return;
    }

    // Getting the current date and time
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0];
    const currentTime = currentDate.toLocaleTimeString();
    const currentDateTime = `${currentDateString} ${currentTime}`;
    const taskAssignDate = currentDateTime;
    // Getting all the tasks if present in localstorage
    let tasks = JSON.parse(localStorage.getItem(currentUser + "_tasks")) || [];
    // Adding the new task to the tasks array
    tasks.push({
      title: taskTitle,
      dueDate: dueDate,
      priority: priority,
      taskAssignDate: taskAssignDate,
      completed: false,
    });
    // Storing the tasks array in localstorage
    localStorage.setItem(currentUser + "_tasks", JSON.stringify(tasks));
    // Clearing the input fields
    setTaskTitle("");
    setDueDate("");
    setPriority("");
    setAllTasks(tasks);
  };

  const handleAddPriority = (e) => {
    // Traverse the DOM to get the button element
    const button = e.target.closest("button");

    // Get the id of the button (task-title)
    const taskTitle = button.id.split("-")[1];
    console.log("Task Title:", taskTitle); // Log the task title

    const updatedTasks = allTasks.map((task) => {
      if (task.title === taskTitle) {
        return {
          ...task,
          priority: task.priority === true ? false : true,
        };
      }
      return task;
    });

    // Store the updated tasks in localStorage
    localStorage.setItem(currentUser + "_tasks", JSON.stringify(updatedTasks));
    // Update the state with the updated tasks
    setAllTasks(updatedTasks);
  };

  const handleTaskComplete = (e) => {
    // Traverse the DOM to get the checkbox element
    const checkbox = e.target.closest('input[type="checkbox"]');

    // Get the id of the checkbox (task-title)
    const taskTitle = checkbox.id.split("-")[1];
    console.log("Task Title:", taskTitle); // Log the task title

    // Update the tasks array to mark the task as completed or not
    const updatedTasks = allTasks.map((task) => {
      if (task.title === taskTitle) {
        return {
          ...task,
          completed: checkbox.checked, // If checked, mark as completed
        };
      }
      return task;
    });

    // Store the updated tasks in localStorage
    localStorage.setItem(currentUser + "_tasks", JSON.stringify(updatedTasks));

    // Update the state with the updated tasks
    setAllTasks(updatedTasks);
  };

  return (
    <>
      <div
        className={`w-full ${
          theme == "light" ? "text-[#142E159E]" : "text-[#97F69BB5]"
        }`}
      >
        {}
        <div className="">
          <span className="text-xs">To-Do</span>
          <i
            class="bi bi-caret-down-fill ml-2"
            style={{ fontSize: "10px" }}
          ></i>
        </div>
        <div
          className={`h-[25%] w-full ml-2 rounded-md flex relative ${
            theme == "light" ? "" : "text-dark-sidebar_text"
          }`}
          style={{
            background:
              theme == "light"
                ? themeJson.light.add_task_bg_style.background
                : themeJson.dark.add_task_bg_style.background,
          }}
        >
          <div className="absolute flex flex-col w-full justify-center px-6 top-0 bottom-0">
            <input
              onChange={(e) => setTaskTitle(e.target.value)}
              type="text"
              name=""
              id=""
              style={{ background: "none", backgroundColor: "none" }}
              className="w-full focus:outline-none border-none focus:border-none"
              placeholder="Add a task"
            />
          </div>
          <ul className="flex gap-4 absolute bottom-4 left-6">
            <li className="cursor-pointer">
              <i class="bi bi-bell" style={{ fontSize: "1.2rem" }}></i>
            </li>
            <li className="cursor-pointer">
              <i class="bi bi-arrow-repeat" style={{ fontSize: "1.2rem" }}></i>
            </li>
            <li className="cursor-pointer">
              <i
                class="bi bi-calendar-event"
                style={{ fontSize: "1.2rem" }}
              ></i>
            </li>
          </ul>
          <div className="absolute bottom-4 right-6">
            <button
              onClick={handleAddTask}
              className={`px-[8px] py-[6px] rounded-md ${
                theme == "light"
                  ? "bg-light-add_task_btn text-light-add_task_btn_text"
                  : "bg-dark-add_task_btn text-dark-add_task_btn_text"
              }`}
            >
              Add Task
            </button>
          </div>
        </div>
        <div className="pl-2 pt-3">
          {allTasks
            .sort((a, b) => b.priority - a.priority)
            .map((task, index) => {
              if (task.completed === true) return null;
              return (
                <div
                  onClick={() => setSelectedTask(task)}
                  key={task.title}
                  className={`flex justify-between py-4 pl-3 items-center border-b ${
                    theme == "light" ? "text-black" : "text-dark-sidebar_text"
                  } `}
                >
                  <div className="flex gap-4 text-sm">
                    <input
                      type="checkbox"
                      name=""
                      id={`task-` + task.title}
                      className="accent-green-600 hover:cursor-pointer"
                      onClick={handleTaskComplete}
                    />
                    <label
                      className="select-none"
                    >
                      {task.title}
                    </label>
                  </div>
                  <button
                    onClick={handleAddPriority}
                    id={`task-${task.title}`}
                    className="hover:cursor-pointer"
                  >
                    {task.priority === true ? (
                      <i class="bi bi-star-fill"></i>
                    ) : (
                      <i class="bi bi-star"></i>
                    )}
                  </button>
                </div>
              );
            })}
        </div>
        <div className="pt-2 pl-3">
          <span className={`${theme == "light" ? "text-black" : "text-white"}`}>
            Completed
          </span>
          {allTasks
            .sort((a, b) => b.priority - a.priority)
            .map((task, index) => {
              if (task.completed !== true) return null;
              return (
                <div
                  onClick={() => setSelectedTask(task)}
                  key={task.title}
                  className={`flex justify-between py-4 pl-3 items-center border-b ${
                    theme == "light" ? "text-black" : "text-dark-sidebar_text"
                  } `}
                >
                  <div className="flex gap-4 text-sm">
                    <input
                      type="checkbox"
                      name=""
                      id={`task-` + task.title}
                      className="accent-green-600 hover:cursor-pointer"
                      onClick={handleTaskComplete}
                      defaultChecked={true}
                    />
                    <label
                      htmlFor={`task-` + task.title}
                      className="hover:cursor-pointer select-none line-through"
                    >
                      {task.title}
                    </label>
                  </div>
                  <button
                    onClick={handleAddPriority}
                    id={`task-${task.title}`}
                    className="hover:cursor-pointer"
                  >
                    {task.priority === true ? (
                      <i class="bi bi-star-fill"></i>
                    ) : (
                      <i class="bi bi-star"></i>
                    )}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      {selectedTask && <RightPane task={selectedTask} />}
    </>
  );
};

export default MainLanding;
