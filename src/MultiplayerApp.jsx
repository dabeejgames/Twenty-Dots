import React, { useState } from "react";
import { MultiplayerProvider, useMultiplayer } from "./MultiplayerProvider";
// Import your other components as needed

function safeArray(arr, fallback = []) {
  return Array.isArray(arr) ? arr : fallback;
}

function GameInterface({ onBack }) {
  const {
    connected,
    roomId,
    joinRoom,
    sendGameAction,
    playerIndex,
    players,
    gameState,
    boardState,
    hand,
    activePlayer,
    winner,
    discardPiles,
    dice,
    showTutorial,
    setShowTutorial,
  } = useMultiplayer();

  const [mode, setMode] = useState("easy");

  if (playerIndex === -1) {
    return (
      <div>
        <h2>Room is full!</h2>
        <button onClick={onBack}>Back</button>
      </div>
    );
  }

  // Defensive: Wait for critical data before rendering the game
  const safePlayers = safeArray(players, [{}, {}]);
  const safeHand = safeArray(hand, [null, null, null, null, null]);
  const safeDiscardPiles = safeArray(discardPiles, [[], []]);
  const safeBoardState = safeArray(boardState, []);
  const safeDice = safeArray(dice, [1, 2]);

  if (!connected && !roomId) {
    return (
      <div>
        <button onClick={() => joinRoom(prompt("Room ID:"))}>Join Room</button>
      </div>
    );
  }

  if (!safePlayers.length || !safeHand.length || !safeDiscardPiles.length) {
    return (
      <div>
        <div>Loading multiplayer data...</div>
        <button onClick={onBack}>Back</button>
      </div>
    );
  }

  return (
    <div>
      {/* Example: Add your UI for game, scoreboard, etc. */}
      <button onClick={onBack}>Back</button>
      <div>
        <span>Players: {safePlayers.map(p => p?.name).join(", ")}</span>
        <span>Active Player: {activePlayer}</span>
        <span>Game State: {gameState}</span>
        <span>Dice: {safeDice.join(" / ")}</span>
        {/* Render board, hand, etc. */}
      </div>
    </div>
  );
}

export default function MultiplayerApp({ onBack }) {
  return (
    <MultiplayerProvider>
      <GameInterface onBack={onBack} />
    </MultiplayerProvider>
  );
}