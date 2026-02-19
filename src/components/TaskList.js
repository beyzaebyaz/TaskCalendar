import React, { useState } from "react";

function TaskList({ tasks, toggleTask, deleteTask }) {
  const [taskToDelete, setTaskToDelete] = useState(null);

  const priorityLabels = {
    low: "Düşük",
    medium: "Orta",
    high: "Yüksek",
  };

  return (
    <div className="task-list-wrapper">
      <div className="task-list">
        {tasks.length === 0 && (
          <p className="empty-message">Görev yok.</p>
        )}

        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <div className="task-info">
              <span className="task-text">{task.text}</span>

              <span className={`priority ${task.priority}`}>
                {priorityLabels[task.priority]}
              </span>
            </div>

            <div className="task-actions">
              <button
                className="complete-btn"
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? "Geri Al" : "Tamamla"}
              </button>

              <button
                className="delete-btn"
                onClick={() => setTaskToDelete(task.id)}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      {taskToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Bu görevi silmek istediğine emin misin?</p>

            <div className="modal-actions">
              <button
                className="confirm-btn"
                onClick={() => {
                  deleteTask(taskToDelete);
                  setTaskToDelete(null);
                }}
              >
                Evet
              </button>

              <button
                className="cancel-btn"
                onClick={() => setTaskToDelete(null)}
              >
                Vazgeç
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
