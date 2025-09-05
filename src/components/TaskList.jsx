// src/components/TaskList.jsx
import { useEffect, useState } from "react";

function TaskRow({ task, toggleTask, deleteTask, editTask, toggleEditing }) {
  const [draft, setDraft] = useState(task.text);

  useEffect(() => {
    if (task.editing) setDraft(task.text);
  }, [task.editing, task.text]);

  return (
    <li
      className="flex items-center gap-3 p-2 border rounded dark:border-gray-700"
      key={task.id}
    >
      {/* Completion checkbox */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="h-5 w-5 accent-blue-500"
        aria-label={`Mark "${task.text}" as ${task.completed ? "incomplete" : "complete"}`}
      />

      {/* Text + due date OR edit field */}
      {!task.editing ? (
        <div className="flex-1 min-w-0">
          <div
            className={`text-left break-words ${
              task.completed ? "line-through text-gray-500 dark:text-gray-400" : ""
            }`}
          >
            {task.text}
          </div>
          {task.dueDate && (
            <div className="text-xs text-gray-400 mt-0.5">
              Due: {task.dueDate}
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") editTask(task.id, draft.trim() || task.text);
              if (e.key === "Escape") toggleEditing(task.id);
            }}
            className="w-full p-1 border rounded dark:border-gray-700 dark:bg-gray-900"
            autoFocus
          />
          <button
            className="px-2 py-1 text-sm rounded bg-green-500 text-white hover:bg-green-600"
            onClick={() => editTask(task.id, draft.trim() || task.text)}
          >
            Save
          </button>
          <button
            className="px-2 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => toggleEditing(task.id)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        {!task.editing && (
          <button
            onClick={() => toggleEditing(task.id)}
            className="text-yellow-600 hover:underline"
            aria-label="Edit task"
            title="Edit"
          >
            ✏️
          </button>
        )}
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-500 hover:underline"
          aria-label="Delete task"
          title="Delete"
        >
          ❌
        </button>
      </div>
    </li>
  );
}

function TaskList({ tasks, toggleTask, deleteTask, editTask, toggleEditing }) {
  if (tasks.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">No tasks yet. Add one above!</p>;
  }

  return (
    <ul className="space-y-2 text-left">
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
          toggleEditing={toggleEditing}
        />
      ))}
    </ul>
  );
}

export default TaskList;
