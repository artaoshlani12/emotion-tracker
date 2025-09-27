import { useState, useEffect } from "react";

export default function EmotionForm({ onAdd }) {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [moods, setMoods] = useState([]); // lista dinamike e gjendjeve
  const [newMood, setNewMood] = useState(""); // input për mood të ri

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood) return alert("Zgjidh një gjendje!");

    const newEmotion = { mood, note, id: Date.now() };
    onAdd(newEmotion); // shtohet vetëm nga përdoruesi
    setMood("");
    setNote("");
  };

  const handleAddMood = () => {
    if (!newMood) return;
    setMoods([newMood, ...moods]); // shto mood në listë
    setNewMood("");
    alert(`Gjendja "${newMood}" u shtua!`);
  };

  const styles = `
    .form {
      width: 100%;
      max-width: 450px;
      background: rgba(255,255,255,0.15);
      padding: 25px;
      border-radius: 20px;
      backdrop-filter: blur(12px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    .input, .textarea {
      width: 100%;
      padding: 12px;
      border-radius: 12px;
      border: none;
      outline: none;
      background: rgba(255,255,255,0.5);
      font-size: 1rem;
    }
    .textarea {
      min-height: 90px;
      resize: none;
    }
    .btn {
      padding: 10px 20px;
      background: #4facfe;
      color: white;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-size: 1rem;
    }
    .btn:hover {
      background: #00f2fe;
    }
    .mood-list {
      width: 100%;
      margin-bottom: 10px;
    }
  `;

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = styles;
    document.head.appendChild(style);
  }, []);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Shto Emocion</h2>

      {/* Input për mood të ri */}
      <div style={{ display: "flex", gap: "10px", width: "100%" }}>
        <input
          className="input"
          placeholder="Shto gjendje të re..."
          value={newMood}
          onChange={(e) => setNewMood(e.target.value)}
        />
        <button type="button" className="btn" onClick={handleAddMood}>
          Shto Mood
        </button>
      </div>

      {/* Dropdown me mood dinamike */}
      <select value={mood} onChange={(e) => setMood(e.target.value)} className="input mood-list">
        <option value="">-- Zgjidh gjendjen --</option>
        {moods.map((m, i) => (
          <option key={i} value={m}>{m}</option>
        ))}
      </select>

      <textarea
        placeholder="Shënim..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="input textarea"
      />
      <button type="submit" className="btn">Ruaj</button>
    </form>
  );
}
