import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    addTask(text, priority);
    setText("");
    setPriority("low");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Görev gir..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
>
  <option value="low">Düşük</option>
  <option value="medium">Orta</option>
  <option value="high">Yüksek</option>
</select>

      <button type="submit">Ekle</button>
    </form>
  );
}

export default TaskForm;
