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

  const styles = `
    html, body, #root {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      font-family: 'Poppins', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #12121f;
    }

    .form {
      width: 95%;
      max-width: 500px;
      max-height: 90vh;
      background: rgba(20, 20, 40, 0.6);
      border: 1px solid rgba(255,255,255,0.1);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 25px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
      display: flex;
      flex-direction: column;
      gap: 20px;
      animation: fadeIn 0.6s ease forwards;
      overflow-y: auto;
      box-sizing: border-box;
      margin: auto;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .form h2 {
      color: #fff;
      text-align: center;
      font-size: 2rem;
      font-weight: 700;
      background: linear-gradient(90deg, #ff758c, #ff7eb3);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

    .input, .textarea, .mood-list {
      width: 100%;
      max-width: 100%;
      padding: 12px 14px;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.15);
      outline: none;
      font-size: 1rem;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    .input:focus, .textarea:focus, .mood-list:focus {
      background: rgba(255, 255, 255, 0.2);
      border-color: #ff7eb3;
      box-shadow: 0 0 8px rgba(255, 126, 179, 0.7);
    }

    .textarea {
      min-height: 80px;
      max-height: 35vh;
      resize: none;
      overflow-y: auto;
    }

    .btn {
      padding: 12px 22px;
      font-size: 1rem;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, #ff7eb3, #ff758c);
      border: none;
      border-radius: 14px;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 8px 20px rgba(255, 126, 179, 0.35);
    }

    .btn:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 12px 30px rgba(255, 126, 179, 0.55);
      background: linear-gradient(135deg, #ff758c, #ff7eb3);
    }

    .mood-input-container {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .mood-input-container input {
      flex: 1 1 auto;
    }

    @media (max-width: 480px) {
      .form {
        padding: 20px 10px;
        width: 95%;
      }

      .input, .textarea, .mood-list {
        font-size: 0.95rem;
        padding: 10px 12px;
      }

      .btn {
        padding: 10px 18px;
        font-size: 0.95rem;
      }

      .mood-input-container {
        flex-direction: column;
      }

      .mood-input-container input, .mood-input-container .btn {
        width: 100%;
      }
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
          + Mood
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

      <button type="submit" className="btn">💾 Ruaj</button>
    </form>
  );
}
