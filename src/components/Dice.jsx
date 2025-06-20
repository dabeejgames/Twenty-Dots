import React from "react";

export default function Dice({ letter, number, onRoll }) {
  return (
    <div className="dice">
      <button onClick={onRoll}>Roll Dice</button>
      <div className="dice-values">
        <span className="dice-letter">{letter || "-"}</span>
        <span className="dice-number">{number || "-"}</span>
      </div>
    </div>
  );
}