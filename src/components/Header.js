import React from "react";

function Header({ activeTab, setActiveTab }) {
  const labels = {
    home: "Ana Sayfa",
    tasks: "Task Manager",
    calendar: "Takvim",
    shopping: "Alışveriş Listesi",
  };

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="header-top">
          {/* SOL: Logo */}
          <button
            type="button"
            className="logo-btn"
            onClick={() => setActiveTab("home")}
            aria-label="Ana sayfaya dön"
          >
            Task Calendar
          </button>

          {/* SAĞ: Sekmeler */}
          <nav className="header-tabs" aria-label="Sekmeler">
            <button
              type="button"
              className={`tab-btn ${activeTab === "tasks" ? "active" : ""}`}
              onClick={() => setActiveTab("tasks")}
            >
              Task
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === "calendar" ? "active" : ""}`}
              onClick={() => setActiveTab("calendar")}
            >
              Takvim
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === "shopping" ? "active" : ""}`}
              onClick={() => setActiveTab("shopping")}
            >
              Alışveriş
            </button>
          </nav>
        </div>

        {/*  Breadcrumb  */}
        <div className="breadcrumb-row" aria-label="Breadcrumb">
          <button
            type="button"
            className="crumb-btn"
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>

          {activeTab !== "home" && (
            <>
              <span className="crumb-sep">›</span>
              <span className="crumb-current">{labels[activeTab]}</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
