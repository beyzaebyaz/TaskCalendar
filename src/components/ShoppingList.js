import React, { useEffect, useState } from "react";

function ShoppingList() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("shopping_items");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("shopping_items", JSON.stringify(items));
  }, [items]);

  const addItem = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newItem = {
      id: Date.now(),
      text: text.trim(),
      bought: false,
    };

    setItems((prev) => [newItem, ...prev]);
    setText("");
  };

  const toggleBought = (id) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, bought: !it.bought } : it))
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const toBuy = items.filter((i) => !i.bought);
  const boughtItems = items.filter((i) => i.bought);

  return (
    <div className="panel">
      <div className="panel-header">
        <h2 className="panel-title">Alışveriş Listesi</h2>
        <div className="muted">
          Alınacak: {toBuy.length} • Alınan: {boughtItems.length}
        </div>
      </div>

      <form className="shop-form" onSubmit={addItem}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Örn: Süt, Ekmek..."
        />
        <button type="submit">Ekle</button>
      </form>

      {/* ALINACAKLAR */}
      <h3 className="section-title">Alınacaklar</h3>
      <div className="shop-list">
        {toBuy.length === 0 ? (
          <p className="empty-message">Alınacak ürün yok.</p>
        ) : (
          toBuy.map((it) => (
            <div key={it.id} className="shop-item">
              <span className="shop-text">{it.text}</span>

              <div className="shop-actions">
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => toggleBought(it.id)}
                >
                  Aldım
                </button>
                <button
                  type="button"
                  className="danger-btn"
                  onClick={() => removeItem(it.id)}
                >
                  Sil
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ALDIKLARIM */}
      <h3 className="section-title" style={{ marginTop: 22 }}>
        Aldıklarım
      </h3>
      <div className="shop-list">
        {boughtItems.length === 0 ? (
          <p className="empty-message">Henüz alınan ürün yok.</p>
        ) : (
          boughtItems.map((it) => (
            <div key={it.id} className="shop-item bought">
              <span className="shop-text">{it.text}</span>

              <div className="shop-actions">
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => toggleBought(it.id)}
                >
                  Geri Al
                </button>
                <button
                  type="button"
                  className="danger-btn"
                  onClick={() => removeItem(it.id)}
                >
                  Sil
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ShoppingList;
