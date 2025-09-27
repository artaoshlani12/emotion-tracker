import { useState } from "react";
import EmotionForm from "./components/EmotionForm";
import EmotionList from "./components/EmotionList";
import Suggestions from "./components/Suggestions";

export default function App() {
  const [emotions, setEmotions] = useState([]); // Lista fillon bosh

  const addEmotion = (newEmotion) => {
    setEmotions([newEmotion, ...emotions]); // shtohet vetëm nga përdoruesi
  };

  /* ================= CSS BRËNDA FILE ================= */
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
  `;

  // Inject CSS
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.innerHTML = styles;
    document.head.appendChild(style);
  }

  return (
    <div className="app-container">
      <h1 className="title">🌿 Emotion Tracker</h1>
      <EmotionForm onAdd={addEmotion} />
      <EmotionList emotions={emotions} />
      <Suggestions />
    </div>
  );
}
