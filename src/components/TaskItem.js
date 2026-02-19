import React from "react";

function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li className="task-item">
      <div className="task-left">
        <span
          className={task.completed ? "completed" : ""}
          onClick={() => toggleTask(task.id)}
        >
          {task.text}
        </span>

        <span className={`badge ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      <button onClick={() => deleteTask(task.id)}>
        Tamamla
      </button>
    </li>
  );
}

export default TaskItem;
