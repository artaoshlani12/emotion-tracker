import { useState, useEffect } from "react";
import EmotionForm from "./components/EmotionForm";
import EmotionList from "./components/EmotionList";
import Suggestions from "./components/Suggestions";

export default function App() {
  const [emotions, setEmotions] = useState([]);
  const [activeTab, setActiveTab] = useState("form");

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

  /* ================= CSS MODERNE ME GLASSMORPHISM ================= */
  const styles = `
    body {
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
      backdrop-filter: blur(15px);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 40px 20px;
    }

    .app-container {
      width: 100%;
      max-width: 650px;
      background: rgba(20, 20, 40, 0.6);
      border-radius: 25px;
      padding: 35px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.35);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.1);
      animation: fadeIn 0.6s ease forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .title {
      font-size: 3rem;
      font-weight: 800;
      color: #fff;
      text-align: center;
      text-shadow: 2px 2px 10px rgba(0,0,0,0.3);
      background: linear-gradient(90deg, #ff758c, #ff7eb3);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 1px;
    }

    .menu {
      display: flex;
      justify-content: center;
      gap: 20px;
      background: rgba(255,255,255,0.1);
      border-radius: 20px;
      padding: 10px 20px;
      backdrop-filter: blur(15px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.25);
    }

    .menu button {
      padding: 12px 26px;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 14px;
      cursor: pointer;
      color: #fff;
      background: transparent;
      transition: all 0.3s ease;
    }

    .menu button.active {
      background: linear-gradient(135deg, #ff758c, #ff7eb3);
      box-shadow: 0 8px 20px rgba(255,126,179,0.4);
      transform: scale(1.05);
    }

    .menu button:hover {
      background: rgba(255,255,255,0.2);
      transform: translateY(-2px);
    }

    .content {
      width: 100%;
      animation: fadeInUp 0.7s ease;
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
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

      <div className="menu">
        <button
          className={activeTab === "form" ? "active" : ""}
          onClick={() => setActiveTab("form")}
        >
          ➕ Form
        </button>
        <button
          className={activeTab === "list" ? "active" : ""}
          onClick={() => setActiveTab("list")}
        >
          📋 List
        </button>
        <button
          className={activeTab === "suggestions" ? "active" : ""}
          onClick={() => setActiveTab("suggestions")}
        >
          💡 Suggestions
        </button>
      </div>

      <div className="content">
        {activeTab === "form" && <EmotionForm onAdd={addEmotion} />}
        {activeTab === "list" && <EmotionList emotions={emotions} />}
        {activeTab === "suggestions" && <Suggestions />}
      </div>
    </div>
  );
}
