import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/Home";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import Calendar from "./components/Calendar";
import ShoppingList from "./components/ShoppingList";

import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  // TASKS
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, priority) => {
    if (!text.trim()) return;

    const newTask = {
      id: Date.now(),
      text: text.trim(),
      priority, // low|medium|high
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div className="page-wrapper">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="app-container">
        {activeTab === "home" && <Home goTo={setActiveTab} tasks={tasks} />}

        {activeTab === "tasks" && (
          <div className="todo-card">
            <h1 className="title">Task Manager</h1>

            <div className="stats">
              <div>Toplam: {tasks.length}</div>
              <div>Aktif: {activeTasks.length}</div>
              <div>Tamamlanan: {completedTasks.length}</div>
            </div>

            <TaskForm addTask={addTask} />

            <h2 className="section-title">Aktif Görevler</h2>
            <TaskList tasks={activeTasks} toggleTask={toggleTask} deleteTask={deleteTask} />

            <h2 className="section-title">Tamamlanan Görevler</h2>
            <TaskList tasks={completedTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
          </div>
        )}

        {activeTab === "calendar" && <Calendar />}

        {activeTab === "shopping" && <ShoppingList />}
      </div>

      <Footer />
    </div>
  );
}

export default App;
