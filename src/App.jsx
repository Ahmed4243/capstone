// src/App.jsx
import { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  // Load tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all"); // all | active | completed
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Apply/remove the .dark class on <html> so Tailwind dark: variants work
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  // Persist tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a task
  const addTask = (text, dueDate) => {
    if (!text.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false, dueDate, editing: false },
    ]);
  };

  // Toggle complete
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Delete
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Start/stop editing
  const toggleEditing = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, editing: !t.editing } : t))
    );
  };

  // Save edited text
  const editTask = (id, newText) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, text: newText, editing: false } : t
      )
    );
  };

  // Clear completed
  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  // Search + filter
  const filteredTasks = tasks.filter((t) => {
    if (filter === "active" && t.completed) return false;
    if (filter === "completed" && !t.completed) return false;
    if (search && !t.text.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const remainingCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow text-center dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">✅ To-Do List</h1>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 border rounded dark:border-gray-700 dark:bg-gray-900"
        />

        {/* Add task */}
        <TaskInput addTask={addTask} />

        {/* Filters */}
        <div className="flex justify-center gap-3 my-4 text-sm">
          <button
            onClick={() => setFilter("all")}
            className={`px-2 py-1 rounded ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-2 py-1 rounded ${
              filter === "active"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-2 py-1 rounded ${
              filter === "completed"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Task list */}
        <TaskList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
          toggleEditing={toggleEditing}
        />

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <span>{remainingCount} tasks remaining</span>
          <button
            onClick={clearCompleted}
            className="text-red-500 hover:underline"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
