import React from "react";
import "./Dot.css"; // For dot styling

export default function Dot({ color, location, onPlaceDot }) {
  return (
    <div
  className={`dot ${color ? color : "empty"}${color === "yellow" ? " wild" : ""}`}
  // rest of props
>
  {color === "yellow" ? "★" : color ? "" : "+"}
</div>
  );
}