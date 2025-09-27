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
    setNewSuggestion("");
    alert(`Sugjerimi "${newSuggestion}" u shtua!`);
  };

  const styles = `
    .suggestions {
      width: 100%;
      max-width: 650px;
      background: rgba(255, 255, 255, 0.2);
      padding: 25px;
      border-radius: 20px;
      backdrop-filter: blur(15px);
      box-shadow: 0 10px 40px rgba(0,0,0,0.25);
      text-align: left;
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      gap: 15px;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .suggestions:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 50px rgba(0,0,0,0.35);
    }

    .suggestions h2 {
      margin-bottom: 10px;
      color: #fff;
      font-size: 1.5rem;
      text-shadow: 1px 1px 5px rgba(0,0,0,0.3);
    }

    .input-suggestion {
      padding: 10px 12px;
      border-radius: 12px;
      border: none;
      outline: none;
      font-size: 1rem;
      flex: 1;
      background: rgba(255,255,255,0.4);
    }

    .btn-add {
      padding: 10px 20px;
      background: #4facfe;
      color: #fff;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
    }

    .btn-add:hover {
      background: #00f2fe;
      transform: scale(1.05);
    }

    .suggestion-item {
      padding: 10px 15px;
      border-bottom: 1px solid rgba(255,255,255,0.3);
      border-radius: 10px;
      margin-bottom: 8px;
      background: rgba(255,255,255,0.1);
      color: #fff;
      font-size: 1.1rem;
      opacity: 0;
      transform: translateX(-20px);
      animation: fadeSlide 0.5s forwards;
    }

    .suggestion-item:hover {
      background: rgba(255,255,255,0.3);
      transform: scale(1.03);
    }

    @keyframes fadeSlide {
      to {
        opacity: 1;
        transform: translateX(0);
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

      {/* Input për sugjerim të ri */}
      <div style={{ display: "flex", gap: "10px", width: "100%" }}>
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

      {/* Lista e sugjerimeve */}
      <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
        {suggestions.map((s, i) => (
          <li
            key={i}
            className="suggestion-item"
            style={{ animationDelay: `${i * 0.1}s` }} // animacion stagger
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
