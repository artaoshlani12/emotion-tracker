import { useEffect } from "react";

const moodIcons = {
  happy: "😊",
  sad: "😔",
  stressed: "😣",
  calm: "😌"
};

const moodColors = {
  happy: "linear-gradient(135deg, #f6d365, #fda085)",
  sad: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
  stressed: "linear-gradient(135deg, #ff758c, #ff7eb3)",
  calm: "linear-gradient(135deg, #89f7fe, #66a6ff)"
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
      max-height: 70vh;
      overflow-y: auto;
      padding-right: 5px;
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
      transition: transform 0.3s, box-shadow 0.3s;
      flex-wrap: wrap;
    }

    .emotion-item:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 12px 25px rgba(0,0,0,0.35);
    }

    .emotion-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
      color: #fff;
      flex: 1;
    }

    .emotion-note {
      font-size: 1rem;
      color: rgba(255,255,255,0.9);
    }

    .emotion-date {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.6);
    }

    @keyframes fadeSlide {
      from { opacity: 0; transform: translateY(20px);}
      to { opacity: 1; transform: translateY(0);}
    }

    .no-emotions {
      color: #fff;
      font-style: italic;
      margin-bottom: 1rem;
      text-align: center;
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
      {emotions.map((emo, index) => (
        <div
          key={emo._id}
          className="emotion-item"
          style={{
            background: moodColors[emo.mood] || "rgba(255,255,255,0.25)",
            animationDelay: `${index * 0.1}s`
          }}
        >
          <div className="emotion-content">
            <span style={{ fontSize: "1.3rem" }}>
              {moodIcons[emo.mood] || "❔"} {emo.mood.toUpperCase()}
            </span>
            <span className="emotion-note">{emo.note}</span>
            {emo.createdAt && (
              <span className="emotion-date">
                {new Date(emo.createdAt).toLocaleString()}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
