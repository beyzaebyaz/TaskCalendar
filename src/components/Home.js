import React, { useMemo } from "react";

function Home({ goTo, tasks }) {
  // Shopping & Calendar verilerini localStorage'dan okuyoruz
  const shoppingItems = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("shopping_items")) || [];
    } catch {
      return [];
    }
  }, []);

  const calendarNotes = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("calendar_notes")) || {};
    } catch {
      return {};
    }
  }, []);

  const todayKey = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const totalTasks = tasks?.length || 0;
  const activeTasks = (tasks || []).filter((t) => !t.completed).length;
  const completedTasks = (tasks || []).filter((t) => t.completed).length;

  const toBuyCount = shoppingItems.filter((i) => !i.bought).length;
  const boughtCount = shoppingItems.filter((i) => i.bought).length;

  const todayNotesCount = (calendarNotes[todayKey] || []).length;

  const recentTasks = (tasks || [])
    .slice()
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  const todayNotes = (calendarNotes[todayKey] || []).slice(0, 3);

  return (
    <div className="home-wrap">
      {/* HERO */}
      <div className="home-hero">
        <div>
          <h1 className="home-title">Dashboard</h1>
          <p className="home-subtitle">
            Görevlerini yönet, takvim notlarını takip et ve alışverişini planla.
          </p>
        </div>

        <div className="home-actions">
          <button className="primary-action" onClick={() => goTo("tasks")}>
            + Yeni Görev
          </button>
          <button className="secondary-action" onClick={() => goTo("calendar")}>
            + Not Ekle
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="home-stats">
        <div className="stat-card" onClick={() => goTo("tasks")} role="button">
          <div className="stat-label">Görevler</div>
          <div className="stat-value">{totalTasks}</div>
          <div className="stat-meta">
            Aktif: {activeTasks} • Tamam: {completedTasks}
          </div>
        </div>

        <div className="stat-card" onClick={() => goTo("calendar")} role="button">
          <div className="stat-label">Bugünün Notları</div>
          <div className="stat-value">{todayNotesCount}</div>
          <div className="stat-meta">{todayKey}</div>
        </div>

        <div className="stat-card" onClick={() => goTo("shopping")} role="button">
          <div className="stat-label">Alışveriş</div>
          <div className="stat-value">{toBuyCount}</div>
          <div className="stat-meta">
            Alınacak • Alınan: {boughtCount}
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="home-grid-2">
        {/* Quick cards */}
        <div className="home-card-big" onClick={() => goTo("tasks")} role="button">
          <div className="home-card-big-title">Task Manager</div>
          <div className="home-card-big-desc">
            Görev ekle, tamamla, öncelik ver.
          </div>

          <div className="mini-list">
            {recentTasks.length === 0 ? (
              <div className="mini-empty">Henüz görev yok.</div>
            ) : (
              recentTasks.map((t) => (
                <div key={t.id} className="mini-row">
                  <span className={`mini-dot ${t.completed ? "done" : ""}`} />
                  <span className="mini-text">{t.text}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div
          className="home-card-big"
          onClick={() => goTo("calendar")}
          role="button"
        >
          <div className="home-card-big-title">Takvim</div>
          <div className="home-card-big-desc">
            Günlere not ekle, hızlıca takip et.
          </div>

          <div className="mini-list">
            {todayNotes.length === 0 ? (
              <div className="mini-empty">Bugün için not yok.</div>
            ) : (
              todayNotes.map((n) => (
                <div key={n.id} className="mini-row">
                  <span className="mini-dot" />
                  <span className="mini-text">{n.text}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div
          className="home-card-big"
          onClick={() => goTo("shopping")}
          role="button"
        >
          <div className="home-card-big-title">Alışveriş Listesi</div>
          <div className="home-card-big-desc">
            Alınacaklar ve aldıkların ayrı listeler.
          </div>

          <div className="mini-list">
            {shoppingItems.length === 0 ? (
              <div className="mini-empty">Liste boş.</div>
            ) : (
              shoppingItems.slice(0, 3).map((i) => (
                <div key={i.id} className="mini-row">
                  <span className={`mini-dot ${i.bought ? "done" : ""}`} />
                  <span className="mini-text">{i.text}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
