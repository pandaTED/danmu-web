import { useEffect, useState } from "react";

const DANMU_HEIGHT = 60; // 每条弹幕高度（含margin）
const MIN_DANMU_COUNT = 8; // 8行*60=480px，适合初始无滚动条
const MAX_HEIGHT = DANMU_HEIGHT * MIN_DANMU_COUNT; // 最大高度，超出才隐藏

export default function DanmuList({ danmus }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 最新弹幕排在最前
  const danmuList = [...danmus].reverse();

  return (
    <div style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      overflow: "hidden",
      boxSizing: "border-box",
      paddingLeft: "5%",
      paddingRight: "5%"
    }}>
      <div style={{
        maxHeight: MAX_HEIGHT,
        minHeight: MAX_HEIGHT,
        width: "100%",
        maxWidth: "80%",
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        alignContent: "flex-start",
        gap: "16px 16px",
        background: "none",
        overflow: "hidden",
        boxSizing: "border-box"
      }}>
        {danmuList.map((d) => {
          const elapsed = Math.floor((now - d.time) / 1000);
          const countdown = Math.max(59 - elapsed, 0);
          return (
            <div
              key={d.id}
              style={{
                margin: 0,
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
                maxWidth: 320,
                minWidth: 120,
                minHeight: 36,
                height: 48,
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
          html, body {
            overflow: hidden !important;
          }
        `}</style>
      </div>
    </div>
  );
} 