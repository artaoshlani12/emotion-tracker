import { useState, useEffect } from "react";

export default function EmotionForm({ onAdd }) {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [moods, setMoods] = useState([]);
  const [newMood, setNewMood] = useState("");

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const res = await fetch("http://localhost:5000/emotions");
        const data = await res.json();
        const uniqueMoods = [...new Set(data.map(e => e.mood))];
        setMoods(uniqueMoods);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmotions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood) return alert("Zgjidh një gjendje!");
    try {
      const res = await fetch("http://localhost:5000/emotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, note }),
      });
      if (!res.ok) throw new Error("Gabim gjatë ruajtjes së emocioneve");
      const savedEmotion = await res.json();
      onAdd(savedEmotion);
      setMood("");
      setNote("");
      if (!moods.includes(savedEmotion.mood)) setMoods([savedEmotion.mood, ...moods]);
    } catch (err) {
      console.error(err);
      alert("Nuk mund të ruhen të dhënat në DB");
    }
  };

  const handleAddMood = () => {
    if (!newMood) return;
    if (!moods.includes(newMood)) {
      setMoods([newMood, ...moods]);
      alert(`Gjendja "${newMood}" u shtua!`);
    } else {
      alert(`Gjendja "${newMood}" ekziston tashmë!`);
    }
    setNewMood("");
  };

  /* ================= CSS MË NGJYRËT ================= */
  const styles = `
    .form {
      width: 100%;
      max-width: 500px;
      background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05));
      backdrop-filter: blur(25px);
      border-radius: 25px;
      padding: 30px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
      display: flex;
      flex-direction: column;
      gap: 20px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .form:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35);
    }

    .form h2 {
      color: #fff;
      text-align: center;
      font-size: 2rem;
      margin-bottom: 10px;
      text-shadow: 1px 1px 6px rgba(0,0,0,0.6);
    }

    .input, .textarea {
      width: 100%;
      padding: 14px 16px;
      border-radius: 15px;
      border: none;
      outline: none;
      font-size: 1rem;
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      box-shadow: inset 0 2px 6px rgba(0,0,0,0.2);
      transition: background 0.3s ease, transform 0.2s ease;
    }

    .input:focus, .textarea:focus {
      background: rgba(255, 255, 255, 0.35);
      transform: scale(1.02);
    }

    .textarea {
      min-height: 100px;
      resize: none;
      color: #f1f1f1;
      font-weight: 500;
    }

    .btn {
      padding: 12px 25px;
      font-size: 1rem;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
      border: none;
      border-radius: 15px;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease;
      box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    }

    .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.35);
      background: linear-gradient(135deg, #feb47b 0%, #ff7e5f 100%);
    }

    .mood-list {
      width: 100%;
      border-radius: 15px;
      background: rgba(255, 255, 255, 0.25);
      padding: 14px 16px;
      color: #fff;
      font-weight: 500;
      box-shadow: inset 0 2px 6px rgba(0,0,0,0.2);
      transition: background 0.3s ease, transform 0.2s ease;
    }

    .mood-list:focus {
      background: rgba(255, 255, 255, 0.4);
      transform: scale(1.02);
    }

    .mood-input-container {
      display: flex;
      gap: 12px;
      width: 100%;
    }

    .mood-input-container input {
      flex: 1;
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
    }

    .mood-input-container input:focus {
      background: rgba(255, 255, 255, 0.3);
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

      <div className="mood-input-container">
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

      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="mood-list"
      >
        <option value="">-- Zgjidh gjendjen --</option>
        {moods.map((m, i) => (
          <option key={i} value={m}>{m}</option>
        ))}
      </select>

      <textarea
        placeholder="Shënim..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="textarea"
      />

      <button type="submit" className="btn">Ruaj</button>
    </form>
  );
}
