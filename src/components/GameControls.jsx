import React from "react";

export default function GameControls({ onEndTurn, disabled }) {
  return (
    <div className="game-controls">
      <button onClick={onEndTurn} disabled={disabled}>
        End Turn
      </button>
    </div>
  );
}