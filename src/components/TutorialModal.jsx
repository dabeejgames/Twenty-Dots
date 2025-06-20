import React from "react";

export default function TutorialModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.33)",
      zIndex: 5000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 20px #0005",
        padding: "32px 24px 24px 24px",
        maxWidth: 410,
        width: "90vw",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        position: "relative"
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 18,
            background: "none",
            border: "none",
            fontSize: 28,
            color: "#aaa",
            fontWeight: 700,
            cursor: "pointer",
            lineHeight: "1em"
          }}
          aria-label="Close tutorial"
        >&times;</button>
        <h2 style={{ fontFamily: "'Permanent Marker', cursive", color: "#2b71e7", marginTop: 0, marginBottom: 10 }}>
          How to Play
        </h2>
        <ul style={{ fontSize: "1.08em", lineHeight: 1.7, paddingLeft: 20 }}>
          <li>
            <b>Roll for Wild:</b> Click the <b>Roll</b> button to place a <span style={{color:"#f7e34e"}}>yellow wild</span> dot on the board.
          </li>
          <li>
            <b>Play Cards:</b> Select a card from your hand to place your color dot on that cell of the board.
          </li>
          <li>
            <b>Replace for Points:</b> If you replace a <b>yellow</b> wild or an opponent's dot, you gain 1 point!
          </li>
          <li>
            <b>Clear Rows:</b> Make a line of 3+ of your color (including yellow wilds) to clear them for extra points.
          </li>
          <li>
            <b>Win:</b> First to <b>20 points</b> (Easy) or <b>5 of each color</b> (Hard) wins!
          </li>
          <li>
            <b>AI Hints:</b> If the AI replaces a yellow dot, it immediately rolls for a new wild.
          </li>
        </ul>
        <div style={{
          marginTop: 18,
          fontSize: "0.97em",
          color: "#555",
          background: "#eef7ff",
          padding: "10px 12px",
          borderRadius: 10,
          textAlign: "center"
        }}>
          <b>Tip:</b> Click the <span style={{
            display: "inline-block",
            background: "#2b71e7",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 5,
            fontSize: "0.98em",
            padding: "2px 7px"
          }}>?</span> icon at any time for help!
        </div>
      </div>
    </div>
  );
}