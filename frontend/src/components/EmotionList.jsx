import { useEffect } from "react";

const moodIcons = {
  happy: "😊",
  sad: "😔",
  stressed: "😣",
  calm: "😌"
};

export default function EmotionList({ emotions }) {
  const styles = `
    .emotion-list {
      width: 100%;
      max-width: 650px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
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
      transition: transform 0.3s;
    }

    .emotion-item:hover {
      transform: translateY(-4px);
    }

    @keyframes fadeSlide {
      from { opacity: 0; transform: translateY(20px);}
      to { opacity: 1; transform: translateY(0);}
    }

    .no-emotions {
      color: #fff;
      font-style: italic;
      margin-bottom: 1rem;
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
      {emotions.map((emo) => (
        <div key={emo._id} className="emotion-item">
          <span>{moodIcons[emo.mood] || "❔"} {emo.mood.toUpperCase()} - {emo.note}</span>
        </div>
      ))}
    </div>
  );
}
