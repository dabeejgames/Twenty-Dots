import React from "react";

const colorNames = {
  red: "Red",
  blue: "Blue",
  green: "Green",
  purple: "Purple",
};

const colorSwatch = {
  red: "#e74c3c",
  blue: "#3498db",
  green: "#2ecc71",
  purple: "#a259d9",
};

export default function Scoreboard({ players, mode }) {
  return (
    <div className="scoreboard" style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: "36px",
      margin: "0 0 10px 0"
    }}>
      {players.map((p, idx) => (
        <div
          key={p.name}
          className={`scoreboard-player ${idx === 0 ? "scoreboard-you" : "scoreboard-ai"}`}
          style={{
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 2px 8px #0001",
            padding: "14px 28px",
            minWidth: 140,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontWeight: 600
          }}
        >
          <div className="scoreboard-player-title" style={{ fontSize: "1.18em", marginBottom: 4 }}>
            {p.name}
          </div>
          <div className="scoreboard-score" style={{
            fontSize: "2em",
            color: "#2b71e7",
            fontWeight: 800,
            marginBottom: mode === "hard" ? 4 : 0,
            lineHeight: 1
          }}>
            {p.score}
            <span style={{
              fontSize: "0.55em",
              fontWeight: 600,
              color: "#888",
              marginLeft: 8
            }}>dots</span>
          </div>
          {mode === "hard" && (
            <div className="scoreboard-colors" style={{
              display: "flex",
              flexDirection: "row",
              gap: 12,
              marginTop: 2,
              fontWeight: 700,
              fontSize: "1.05em",
            }}>
              {Object.keys(colorNames).map((col) => (
                <div key={col} title={colorNames[col]} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  minWidth: 24,
                  padding: "0 3px"
                }}>
                  <span style={{
                    display: "inline-block",
                    width: 13,
                    height: 13,
                    borderRadius: "50%",
                    background: colorSwatch[col],
                    border: "2px solid #ddd",
                  }}></span>
                  <span style={{
                    color: colorSwatch[col],
                    fontWeight: 800,
                    fontSize: "1em",
                  }}>{p[col]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}