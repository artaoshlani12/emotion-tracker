import { useState, useEffect } from "react";

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([
    "Merr frymë thellë 🧘‍♂️",
    "Shko për një shëtitje 🚶‍♀️",
    "Shkruaj në ditar ✍️",
    "Bëj një pushim ☕"
  ]);
  const [newSuggestion, setNewSuggestion] = useState("");

  const handleAddSuggestion = () => {
    if (!newSuggestion) return;
    setSuggestions([newSuggestion, ...suggestions]);
    alert(`Sugjerimi "${newSuggestion}" u shtua!`);
    setNewSuggestion("");
  };

  const styles = `
    .suggestions {
      width: 100%;
      max-width: 500px;
      background: rgba(20, 20, 40, 0.6);
      border: 1px solid rgba(255,255,255,0.1);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 0 auto;
      box-sizing: border-box;
      animation: fadeIn 0.6s ease forwards;
    }

    .suggestions h2 {
      font-size: 2rem;
      text-align: center;
      font-weight: 700;
      color: #fff;
      background: linear-gradient(90deg, #ff758c, #ff7eb3);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 15px;
    }

    .input-suggestion {
      flex: 1;
      padding: 14px 16px;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.1);
      color: #fff;
      font-size: 1rem;
      outline: none;
      transition: all 0.3s ease;
    }

    .input-suggestion:focus {
      background: rgba(255,255,255,0.2);
      border-color: #ff7eb3;
      box-shadow: 0 0 8px rgba(255,126,179,0.7);
    }

    .btn-add {
      padding: 13px 26px;
      font-size: 1rem;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, #ff7eb3, #ff758c);
      border: none;
      border-radius: 14px;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 8px 20px rgba(255,126,179,0.35);
    }

    .btn-add:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 12px 30px rgba(255,126,179,0.55);
      background: linear-gradient(135deg, #ff758c, #ff7eb3);
    }

    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .suggestion-item {
      padding: 12px 16px;
      border-radius: 14px;
      background: rgba(255,255,255,0.1);
      color: #fff;
      font-size: 1rem;
      opacity: 0;
      transform: translateY(10px);
      animation: fadeSlide 0.5s forwards;
    }

    .suggestion-item:hover {
      background: rgba(255,255,255,0.25);
      transform: scale(1.03);
    }

    @keyframes fadeSlide {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* RESPONSIVE PËR TELEFON */
    @media (max-width: 480px) {
      .suggestions {
        padding: 25px 15px;
        max-width: 95%;
      }

      .input-suggestion {
        font-size: 0.95rem;
        padding: 12px 14px;
      }

      .btn-add {
        padding: 12px 20px;
        font-size: 0.95rem;
      }

      ul {
        gap: 8px;
      }
    }
  `;

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = styles;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="suggestions">
      <h2>Sugjerime për gjendjen</h2>

      <div style={{ display: "flex", gap: "12px", width: "100%", flexWrap: "wrap" }}>
        <input
          className="input-suggestion"
          placeholder="Shto sugjerim të ri..."
          value={newSuggestion}
          onChange={(e) => setNewSuggestion(e.target.value)}
        />
        <button type="button" className="btn-add" onClick={handleAddSuggestion}>
          Shto
        </button>
      </div>

      <ul>
        {suggestions.map((s, i) => (
          <li
            key={i}
            className="suggestion-item"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
