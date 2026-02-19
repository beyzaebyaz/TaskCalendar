import React, { useEffect, useMemo, useState } from "react";

function Calendar() {
  const today = new Date();

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-11

  // Seçili gün (YYYY-MM-DD)
  const [selectedDate, setSelectedDate] = useState(() => {
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  // Notlar: { "2026-02-19": ["Not 1", "Not 2"], ... }
  const [notesByDate, setNotesByDate] = useState(() => {
    const saved = localStorage.getItem("calendar_notes");
    return saved ? JSON.parse(saved) : {};
  });

  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    localStorage.setItem("calendar_notes", JSON.stringify(notesByDate));
  }, [notesByDate]);

  const monthLabel = useMemo(() => {
    const d = new Date(currentYear, currentMonth, 1);
    return d.toLocaleString("tr-TR", { month: "long", year: "numeric" });
  }, [currentYear, currentMonth]);

  const weekDays = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

  const days = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const startDayIndex = (firstDayOfMonth.getDay() + 6) % 7; // Pazartesi=0
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < startDayIndex; i++) cells.push(null);
    for (let d = 1; d <= lastDate; d++) cells.push(d);
    return cells;
  }, [currentYear, currentMonth]);

  const toKey = (year, month0, day) => {
    const mm = String(month0 + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };

  const isToday = (day) => {
    if (!day) return false;
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const goPrev = () => {
    const m = currentMonth - 1;
    if (m < 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else setCurrentMonth(m);
  };

  const goNext = () => {
    const m = currentMonth + 1;
    if (m > 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else setCurrentMonth(m);
  };

  const selectedNotes = notesByDate[selectedDate] || [];

  const addNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    setNotesByDate((prev) => {
      const existing = prev[selectedDate] || [];
      return {
        ...prev,
        [selectedDate]: [{ id: Date.now(), text: noteText.trim() }, ...existing],
      };
    });

    setNoteText("");
  };

  const deleteNote = (noteId) => {
    setNotesByDate((prev) => {
      const existing = prev[selectedDate] || [];
      const updated = existing.filter((n) => n.id !== noteId);

      const next = { ...prev, [selectedDate]: updated };

      // boş listeyse key'i kaldır (temiz veri)
      if (updated.length === 0) {
        const copy = { ...prev };
        delete copy[selectedDate];
        return copy;
      }

      return next;
    });
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2 className="panel-title">Takvim</h2>

        <div className="cal-controls">
          <button className="ghost-btn" onClick={goPrev} type="button">
            ←
          </button>
          <span className="cal-month">{monthLabel}</span>
          <button className="ghost-btn" onClick={goNext} type="button">
            →
          </button>
        </div>
      </div>

      <div className="calendar">
        {weekDays.map((w) => (
          <div key={w} className="cal-weekday">
            {w}
          </div>
        ))}

        {days.map((d, idx) => {
          if (!d) {
            return <div key={`e-${idx}`} className="cal-day empty" />;
          }

          const dateKey = toKey(currentYear, currentMonth, d);
          const hasNotes = (notesByDate[dateKey] || []).length > 0;
          const isSelected = selectedDate === dateKey;

          return (
            <button
              key={dateKey}
              type="button"
              className={[
                "cal-day",
                isToday(d) ? "today" : "",
                isSelected ? "selected" : "",
              ].join(" ")}
              onClick={() => setSelectedDate(dateKey)}
              title={hasNotes ? "Not var" : ""}
            >
              <span className="cal-day-number">{d}</span>
              {hasNotes && <span className="cal-dot" />}
            </button>
          );
        })}
      </div>

      {/* Not alanı */}
      <div className="notes-box">
        <div className="notes-header">
          <h3 className="notes-title">Notlar</h3>
          <span className="muted">{selectedDate}</span>
        </div>

        <form className="notes-form" onSubmit={addNote}>
          <input
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Bu güne not ekle..."
          />
          <button type="submit">Kaydet</button>
        </form>

        {selectedNotes.length === 0 ? (
          <p className="empty-message">Bu güne ait not yok.</p>
        ) : (
          <div className="notes-list">
            {selectedNotes.map((n) => (
              <div key={n.id} className="note-item">
                <span className="note-text">{n.text}</span>
                <button
                  type="button"
                  className="danger-btn"
                  onClick={() => deleteNote(n.id)}
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendar;
