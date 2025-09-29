import { useState, useEffect } from "react";

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([
    "Merr frymë thellë 🧘‍♂️",
    "Shko për një shëtitje 🚶‍♀️",
    "Shkruaj në ditar ✍️",
    "Bëj një pushim ☕"
  ]);
  const [newSuggestion, setNewSuggestion] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddSuggestion = () => {
    if (!newSuggestion.trim()) return;
    setSuggestions([...suggestions, newSuggestion]);
    setNewSuggestion("");
  };

  const handleDelete = (index) => {
    setSuggestions(suggestions.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingText("");
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingText(suggestions[index]);
  };

  const handleSave = (index) => {
    const updated = [...suggestions];
    updated[index] = editingText;
    setSuggestions(updated);
    setEditingIndex(null);
    setEditingText("");
  };

  const styles = `
    html, body, #root {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #1f1f2e, #2e2e4d);
    }

    .suggestions-container {
      width: 100%;
      min-height: 100vh;
      padding: 30px 40px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .suggestions h2 {
      font-size: 2.6rem;
      font-weight: 800;
      color: #fff;
      background: linear-gradient(90deg, #ff758c, #ff7eb3);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
      margin: 0;
      margin-bottom: 35px; /* më shumë hapësirë poshtë titullit */
    }

    .input-wrapper {
      display: flex;
      gap: 12px;
      width: 100%;
      flex-wrap: wrap;
    }

    .input-suggestion {
      flex: 1;
      padding: 16px 18px; /* pak më shumë padding për inputin */
      border-radius: 18px;
      border: 1px solid rgba(255,255,255,0.2);
      background: rgba(255,255,255,0.08);
      color: #fff;
      font-size: 1rem;
      outline: none;
      transition: all 0.3s ease;
    }

    .input-suggestion:focus {
      background: rgba(255,255,255,0.2);
      border-color: #ff7eb3;
      box-shadow: 0 0 10px rgba(255,126,179,0.5);
    }

    .btn-add {
      padding: 14px 28px;
      font-size: 1rem;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, #ff7eb3, #ff758c);
      border: none;
      border-radius: 18px;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 10px 25px rgba(255,126,179,0.4);
    }

    .btn-add:hover {
      transform: translateY(-3px) scale(1.04);
      box-shadow: 0 14px 35px rgba(255,126,179,0.55);
      background: linear-gradient(135deg, #ff758c, #ff7eb3);
    }

    .cards {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-top: 20px; /* hapësirë poshtë inputit */
    }

    .card {
      background: rgba(255, 255, 255, 0.05);
      padding: 20px 18px;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      gap: 15px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      transition: all 0.25s ease;
      opacity: 0;
      transform: translateY(15px) scale(0.95);
      animation: fadeSlide 0.5s forwards;
    }

    .card:hover {
      transform: scale(1.03);
      background: rgba(255,255,255,0.12);
    }

    .card-text {
      color: #fff;
      font-size: 1.2rem;
      font-weight: 600;
      word-break: break-word;
    }

    .card-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    .action-btn {
      background: transparent;
      border: none;
      color: #ff758c;
      font-size: 1.2rem;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .action-btn:hover {
      transform: scale(1.3);
    }

    .edit-input {
      padding: 10px 12px;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.3);
      background: rgba(255,255,255,0.1);
      color: #fff;
      outline: none;
      font-size: 1.1rem;
      font-weight: 600;
    }

    @keyframes fadeSlide {
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @media (max-width: 768px) {
      .suggestions-container {
        padding: 20px 15px;
      }
      .cards {
        grid-template-columns: 1fr;
      }
    }
  `;

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = styles;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="suggestions-container">
      <div className="suggestions">
        <h2>Sugjerime për gjendjen</h2>

        <div className="input-wrapper">
          <input
            className="input-suggestion"
            placeholder="Shto sugjerim të ri..."
            value={newSuggestion}
            onChange={(e) => setNewSuggestion(e.target.value)}
          />
          <button className="btn-add" onClick={handleAddSuggestion}>
            Shto
          </button>
        </div>

        <div className="cards">
          {suggestions.map((s, i) => (
            <div
              key={i}
              className="card"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {editingIndex === i ? (
                <>
                  <input
                    className="edit-input"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <div className="card-actions">
                    <button className="action-btn" onClick={() => handleSave(i)}>💾</button>
                    <button className="action-btn" onClick={() => setEditingIndex(null)}>❌</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="card-text">{s}</div>
                  <div className="card-actions">
                    <button className="action-btn" onClick={() => handleEdit(i)}>✏️</button>
                    <button className="action-btn" onClick={() => handleDelete(i)}>🗑️</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
