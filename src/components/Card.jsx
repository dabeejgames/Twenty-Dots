import React from "react";
import "./Card.css";

export default function Card({ color, row, col, selected, onClick }) {
  const location = `${row}${col}`;
  const colorClass = color ? `card-${color.toLowerCase()}` : "";
  return (
    <div
      className={`card ${colorClass}${selected ? " selected" : ""}`}
      onClick={onClick}
      title={`${color} ${location}`}
    >
      <div className="card-location">{location}</div>
    </div>
  );
}