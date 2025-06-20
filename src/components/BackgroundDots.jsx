import React from "react";

const DOTS = [
  // [left %, top %, size px, color]
  [10, 8, 80, "#3ddc97"],
  [80, 12, 55, "#fc6262"],
  [20, 60, 45, "#3e6ff4"],
  [70, 70, 95, "#ffe156"],
  [40, 30, 120, "#b09fff"],
  [85, 50, 40, "#3ddc97"],
  [5, 85, 70, "#fc6262"],
  [60, 20, 60, "#3e6ff4"],
  [50, 80, 55, "#ffe156"],
  [30, 75, 60, "#b09fff"],
  [90, 85, 80, "#3ddc97"],
  [33, 10, 40, "#fc6262"],
];

export default function BackgroundDots() {
  return (
    <div className="dots-bg-circles" aria-hidden="true">
      {DOTS.map(([left, top, size, color], i) => (
        <span
          key={i}
          className="dot-bg-circle"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            background: color,
          }}
        />
      ))}
    </div>
  );
}