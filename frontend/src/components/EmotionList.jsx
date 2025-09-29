import { useEffect, useState } from "react";

const moodIcons = {
  happy: "😊",
  sad: "😔",
  stressed: "😣",
  calm: "😌"
};

export default function EmotionList({ emotions, onUpdate, onDelete, addedMoods }) {
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState("");
  const [editMood, setEditMood] = useState("");

  useEffect(() => {
    if (emotions && emotions.length > 0) {
      localStorage.setItem("emotions", JSON.stringify(emotions));
    }
  }, [emotions]);

  const handleEdit = (emo) => {
    setEditingId(emo._id);
    setEditNote(emo.note);
    setEditMood(emo.mood);
  };

  const handleSave = (id) => {
    if (editNote.trim() === "" || editMood === "") {
      alert("Gjithçka duhet të plotësohet!");
      return;
    }
    onUpdate(id, { mood: editMood, note: editNote });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const styles = `
    .emotion-list {
      width: 100%;
      min-height: 100vh;   /* faqja zgjatet sipas përmbajtjes */
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      overflow: visible;   /* ✅ s’ka scroll */
      box-sizing: border-box;
    }
    .emotion-item {
      background: rgba(255, 255, 255, 0.25);
      border-radius: 15px;
      padding: 15px 20px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.25);
      display: flex;
      align-items: center;
      justify-content: space-between;
      opacity: 0;
      animation: fadeSlide 0.6s forwards;
      transition: transform 0.3s, box-shadow 0.3s;
      flex-wrap: wrap;
    }
    .emotion-item:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 12px 25px rgba(0,0,0,0.35);
    }
    .emotion-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
      color: #fff;
      flex: 1;
    }
    .emotion-note {
      font-size: 1rem;
      color: rgba(255,255,255,0.9);
    }
    .emotion-date {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.6);
    }
    .emotion-actions {
      display: flex;
      gap: 10px;
      margin-left: 10px;
    }
    .btn-action {
      background: rgba(255,255,255,0.15);
      border: none;
      padding: 6px 10px;
      border-radius: 8px;
      cursor: pointer;
      color: #fff;
      transition: all 0.2s ease;
    }
    .btn-action:hover {
      background: rgba(255,255,255,0.3);
    }
    .edit-input, .edit-select {
      padding: 6px 10px;
      border-radius: 8px;
      border: none;
      margin-top: 5px;
      font-size: 0.95rem;
    }
    .btn-save {
      background: linear-gradient(135deg, #ff7eb3, #ff758c);
      color: #fff;
      border-radius: 10px;
      padding: 6px 12px;
      cursor: pointer;
      margin-top: 5px;
    }
    .btn-save:hover {
      transform: scale(1.05);
    }
    @keyframes fadeSlide {
      from { opacity: 0; transform: translateY(20px);}
      to { opacity: 1; transform: translateY(0);}
    }
    .no-emotions {
      color: #fff;
      font-style: italic;
      text-align: center;
      margin-top: 2rem;
    }
  `;

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = styles;
    document.head.appendChild(style);
  }, []);

  if (!emotions || emotions.length === 0)
    return <p className="no-emotions">Nuk ka emocione të regjistruara ende.</p>;

  return (
    <div className="emotion-list">
      {emotions.map((emo, index) => (
        <div
          key={emo._id}
          className="emotion-item"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {editingId === emo._id ? (
            <div className="emotion-content">
              <select
                className="edit-select"
                value={editMood}
                onChange={(e) => setEditMood(e.target.value)}
              >
                {addedMoods.map((m) => (
                  <option key={m} value={m}>{m.toUpperCase()}</option>
                ))}
              </select>
              <input
                className="edit-input"
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
              />
              <button className="btn-save" onClick={() => handleSave(emo._id)}>💾 Ruaj</button>
              <button className="btn-action" onClick={handleCancel}>❌ Anulo</button>
            </div>
          ) : (
            <>
              <div className="emotion-content">
                <span style={{ fontSize: "1.3rem" }}>
                  {moodIcons[emo.mood] || ""} {emo.mood.toUpperCase()}
                </span>
                <span className="emotion-note">{emo.note}</span>
                {emo.createdAt && (
                  <span className="emotion-date">
                    {new Date(emo.createdAt).toLocaleString()}
                  </span>
                )}
              </div>
              <div className="emotion-actions">
                <button className="btn-action" onClick={() => handleEdit(emo)}>✏️ Edit</button>
                <button className="btn-action" onClick={() => onDelete(emo._id)}>🗑️ Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
