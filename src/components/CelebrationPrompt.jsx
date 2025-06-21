import React from "react";

export default function CelebrationPrompt({ winner, onClose }) {
  // winner: string ("You" or "AI" or anything)
  // onClose: function to call when prompt is dismissed (optional)

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, width: "100vw", height: "100vh",
        zIndex: 5000,
        background: "rgba(0,0,0,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 8px 36px #0004, 0 1.5px 7px #0001",
          padding: "42px 36px 36px 36px",
          minWidth: 270,
          minHeight: 170,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          border: "4px solid #ffe066",
          animation: "popCelebrate 0.8s cubic-bezier(.4,2,.3,1.1)",
        }}
      >
        <div style={{
          fontSize: "2.9em",
          fontWeight: 900,
          color: "#27ae60",
          textShadow: "0 3px 0 #d9ffe6, 0 7px 18px #24c47d44",
          marginBottom: 12,
          letterSpacing: "1.5px",
          textAlign: "center",
          lineHeight: 1.1,
          fontFamily: "Segoe UI, Arial, Helvetica, sans-serif",
        }}>
          {winner === "You"
            ? "You Won!"
            : winner === "AI"
              ? "AI Wins!"
              : `${winner} Wins!`}
        </div>
        <div style={{ fontSize: "2.1em", marginBottom: 8 }}>
          🎉🎊
        </div>
        <button
          style={{
            marginTop: 10,
            background: "#ffe066",
            color: "#222",
            fontWeight: 700,
            fontSize: "1.13em",
            border: "none",
            borderRadius: 8,
            padding: "7px 24px",
            boxShadow: "0 2px 8px #eccb1a33",
            cursor: "pointer",
            transition: "background 0.2s"
          }}
          onClick={onClose}
        >
          OK
        </button>
      </div>
      {/* Celebration pop animation */}
      <style>{`
        @keyframes popCelebrate {
          0% { transform: scale(0.85); opacity: 0.2;}
          80% { transform: scale(1.09);}
          100% { transform: scale(1); opacity: 1;}
        }
      `}</style>
    </div>
  );
}