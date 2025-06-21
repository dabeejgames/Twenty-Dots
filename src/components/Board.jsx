import React from "react";

const ROWS = ["A", "B", "C", "D", "E", "F"];
const COLS = [1, 2, 3, 4, 5, 6];

const colorMap = {
  red: "#e74c3c",
  blue: "#3498db",
  green: "#2ecc71",
  purple: "#a259d9",
  yellow: "#f7e34e",
};

function getCellColor(dot) {
  if (!dot) return "#fff";
  return colorMap[dot] || "#fff";
}

function getDotShadow(dot) {
  if (!dot) return "0 1px 7px #0000";
  if (dot === "yellow") return "0 1px 12px #f7e34e88";
  return `0 2px 13px ${getCellColor(dot)}88, 0 1px 7px #0002`;
}

export default function Board({
  dots = {},
  wildCellId,
  cellSize = 17, // Compact for mobile
  style = {},
}) {
  // Board grid size calculations:
  const borderSpacing = 2;
  const padding = 6;
  const cellCount = ROWS.length;
  const tableContentHeight = cellCount * cellSize + (cellCount - 1) * borderSpacing;
  const boardHeight = tableContentHeight + padding * 2;

  return (
    <div
      className="board-root"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: padding,
        background: "rgba(255,255,255,0.96)",
        borderRadius: 14,
        boxShadow: "0 2px 10px #20305b22",
        minHeight: boardHeight,
        minWidth: 0,
        width: "100%",
        maxWidth: 370,
        ...style,
      }}
    >
      <table
        style={{
          borderCollapse: "separate",
          borderSpacing: borderSpacing,
          margin: 0,
          userSelect: "none",
          width: "auto",
          height: tableContentHeight,
        }}
      >
        <thead>
          <tr>
            <th></th>
            {COLS.map((col) => (
              <th key={col} style={{ fontWeight: 900, fontSize: "1.09em", color: "#34495e" }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row}>
              <th style={{ fontWeight: 900, fontSize: "1.09em", color: "#34495e" }}>{row}</th>
              {COLS.map((col) => {
                const cellId = `${row}${col}`;
                const dot = dots[cellId];
                const isWild = wildCellId === cellId;
                return (
                  <td
                    key={cellId}
                    style={{
                      padding: 0,
                      position: "relative",
                      transition: "background 0.18s",
                    }}
                  >
                    <div
                      style={{
                        width: cellSize,
                        height: cellSize,
                        borderRadius: "50%",
                        background: dot ? getCellColor(dot) : "#fff",
                        boxShadow: dot ? getDotShadow(dot) : "0 1px 7px #eee",
                        border: dot
                          ? "none"
                          : "2px dashed #e0e6ef",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "1.05em",
                        color: dot === "yellow" ? "#715c13" : "#aaa",
                        cursor: "default",
                        transition: "background 0.2s, box-shadow 0.2s, border 0.2s",
                        outline: isWild ? "2px solid #ffd843" : "none",
                        zIndex: isWild ? 2 : 1,
                        position: "relative",
                        animation: isWild ? "wildPulse 1.1s infinite alternate" : undefined,
                      }}
                    >
                      {dot ? (
                        dot === "yellow" ? "★" : ""
                      ) : (
                        <span style={{ opacity: 0.28 }}>+</span>
                      )}
                      {isWild && (
                        <div
                          style={{
                            position: "absolute",
                            top: -3,
                            left: -3,
                            width: cellSize + 6,
                            height: cellSize + 6,
                            borderRadius: "50%",
                            border: "2px solid #ffd843",
                            boxShadow: "0 0 8px #ffd84344",
                            zIndex: 3,
                            pointerEvents: "none",
                          }}
                        />
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add animation keyframes as inline style tag for wild spot pulse */}
      <style>{`
        @keyframes wildPulse {
          0% { box-shadow: 0 0 0 0 #ffd84390; }
          100% { box-shadow: 0 0 13px 4px #ffd84344; }
        }
      `}</style>
    </div>
  );
}