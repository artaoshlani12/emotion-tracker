import { useState, useEffect } from "react";
import EmotionForm from "./components/EmotionForm";
import EmotionList from "./components/EmotionList";
import Suggestions from "./components/Suggestions";

export default function App() {
  const [emotions, setEmotions] = useState([]);
  const [activeTab, setActiveTab] = useState("form"); // view i zgjedhur

  // Merr emocionet nga backend
  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const res = await fetch("http://localhost:5000/emotions");
        const data = await res.json();
        setEmotions(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmotions();
  }, []);

  const addEmotion = (newEmotion) => {
    setEmotions([newEmotion, ...emotions]);
  };

  /* ================= CSS ================= */
  const styles = `
    .app-container {
      font-family: 'Segoe UI', sans-serif;
      min-height: 100vh;
      background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
      padding: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .title {
      font-size: 2.8rem;
      font-weight: 700;
      color: #fff;
      text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
      text-align: center;
      margin-bottom: 20px;
    }

    .menu {
      display: flex;
      gap: 15px;
      margin-bottom: 30px;
    }

    .menu button {
      padding: 10px 20px;
      font-size: 1rem;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      background: rgba(255,255,255,0.4);
      color: #000;
      transition: 0.3s;
    }

    .menu button.active {
      background: #fff;
      font-weight: bold;
    }

    .menu button:hover {
      background: rgba(255,255,255,0.7);
    }
  `;

  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.innerHTML = styles;
    document.head.appendChild(style);
  }

  return (
    <div className="app-container">
      <h1 className="title">🌿 Emotion Tracker</h1>

      {/* Menu */}
      <div className="menu">
        <button
          className={activeTab === "form" ? "active" : ""}
          onClick={() => setActiveTab("form")}
        >
          Form
        </button>
        <button
          className={activeTab === "list" ? "active" : ""}
          onClick={() => setActiveTab("list")}
        >
          List
        </button>
        <button
          className={activeTab === "suggestions" ? "active" : ""}
          onClick={() => setActiveTab("suggestions")}
        >
          Suggestions
        </button>
      </div>

      {/* Shfaq komponentin e zgjedhur */}
      {activeTab === "form" && <EmotionForm onAdd={addEmotion} />}
      {activeTab === "list" && <EmotionList emotions={emotions} />}
      {activeTab === "suggestions" && <Suggestions />}
    </div>
  );
}
