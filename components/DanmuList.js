import { useEffect, useState } from "react";

export default function DanmuList({ danmus }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      minHeight: 320,
      marginBottom: 100,
      width: 700,
      maxWidth: "100%",
      position: "relative",
      height: 500,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column-reverse",
      alignItems: "center",
      background: "none"
    }}>
      {danmus.map((d) => {
        const elapsed = Math.floor((now - d.time) / 1000);
        const countdown = Math.max(59 - elapsed, 0);
        return (
          <div
            key={d.id}
            style={{
              margin: "12px 0",
              padding: "14px 32px 14px 32px",
              borderRadius: 30,
              background: "linear-gradient(90deg, #00ffe7 0%, #0072ff 100%)",
              color: "#222",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: 1,
              boxShadow: "0 2px 24px #00ffe7, 0 1.5px 0 #222",
              border: "2px solid #00ffe7",
              filter: "drop-shadow(0 0 8px #00ffe7)",
              opacity: 0.95,
              userSelect: "none",
              maxWidth: "90vw",
              wordBreak: "break-all",
              minWidth: 120,
              minHeight: 36,
              width: 320,
              display: "flex",
              alignItems: "center",
              position: "relative",
              transition: "all 0.3s cubic-bezier(.68,-0.55,.27,1.55)"
            }}
          >
            <span style={{
              position: "absolute",
              left: 12,
              top: 8,
              fontSize: 12,
              color: "#ff2d2d",
              opacity: 0.85,
              fontWeight: 600
            }}>{countdown}</span>
            <span style={{ marginLeft: 38 }}>{d.text}</span>
          </div>
        );
      })}
      <style jsx global>{`
        @keyframes danmu-fade-in {
          0% { transform: translateY(40px) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 0.95; }
        }
      `}</style>
    </div>
  );
} 