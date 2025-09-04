function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li className="flex justify-between items-center bg-gray-50 p-3 mb-2 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="h-5 w-5 accent-blue-500"
        />
        <span
          className={`${
            task.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {task.text}
        </span>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:text-red-700 font-bold"
      >
        ✕
      </button>
    </li>
  );
}

export default TaskItem;
