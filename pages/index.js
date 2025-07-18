import { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import DanmuList from "../components/DanmuList";

export default function Home() {
  const [input, setInput] = useState("");
  const [danmus, setDanmus] = useState([]);
  const [sending, setSending] = useState(false); // 发送冷却
  const inputRef = useRef(null);
  const bottomRef = useRef(null); // 用于自动滚动到底部

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });
    const channel = pusher.subscribe("danmu-channel");
    channel.bind("new-danmu", function (data) {
      setDanmus((prev) => [
        ...prev,
        { ...data, id: Date.now() + Math.random() },
      ]);
    });
    return () => {
      pusher.unsubscribe("danmu-channel");
    };
  }, []);

  useEffect(() => {
    if (danmus.length === 0) return;
    const timer = setInterval(() => {
      setDanmus((prev) => prev.filter((d) => Date.now() - d.time < 60000));
    }, 1000);
    return () => clearInterval(timer);
  }, [danmus]);

  // 自动滚动到底部
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [danmus]);

  const handleSend = async () => {
    if (!input.trim() || input.length > 140 || sending) return;
    setSending(true);
    setInput(""); // 立即清空输入框
    inputRef.current?.focus();
    try {
      await fetch("/api/danmu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
    } finally {
      setTimeout(() => setSending(false), 5000); // 5秒冷却
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      fontFamily: "'Orbitron', 'Roboto', 'Arial', sans-serif",
      color: "#fff"
    }}>
      {/* <h2>实时弹幕墙</h2> */}
      <DanmuList danmus={danmus} />
      <div ref={bottomRef} />
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "rgba(20,30,48,0.95)",
        padding: "18px 0 18px 0",
        boxShadow: "0 -2px 16px #00ffe7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10
      }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value.slice(0, 140))}
          onKeyDown={handleKeyDown}
          placeholder="输入弹幕（最多140字，回车发送）"
          style={{
            width: 400,
            maxWidth: "70vw",
            padding: "12px 16px",
            borderRadius: 30,
            border: "none",
            outline: "none",
            fontSize: 18,
            background: "rgba(255,255,255,0.12)",
            color: "#fff",
            boxShadow: "0 2px 8px #00ffe7",
            marginRight: 16,
            letterSpacing: 1
          }}
          disabled={sending}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || sending}
          style={{
            padding: "12px 32px",
            borderRadius: 30,
            border: "none",
            background: !input.trim() || sending ? "#444" : "linear-gradient(90deg,#00ffe7,#0072ff)",
            color: "#222",
            fontWeight: 700,
            fontSize: 18,
            cursor: !input.trim() || sending ? "not-allowed" : "pointer",
            boxShadow: !input.trim() || sending ? "none" : "0 2px 8px #00ffe7",
            transition: "all 0.2s"
          }}
        >{sending ? "冷却中..." : "发送"}</button>
        <span style={{ marginLeft: 16, color: "#00ffe7", fontSize: 16 }}>{input.length}/140</span>
      </div>
      {/* 引入科技感字体 */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap');
      `}</style>
    </div>
  );
} 