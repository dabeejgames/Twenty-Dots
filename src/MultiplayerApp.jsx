import React, { useState } from "react";
import SinglePlayerApp from "./SinglePlayerApp";
import MultiplayerApp from "./MultiplayerApp";

export default function App() {
  const [gameMode, setGameMode] = useState("");

  if (!gameMode) {
    return (
      <div className="mode-select-screen">
        <button onClick={() => setGameMode("ai")}>Play vs AI</button>
        <button onClick={() => setGameMode("multiplayer")}>Play Multiplayer</button>
      </div>
    );
  }
  if (gameMode === "ai") {
    return <SinglePlayerApp onBack={() => setGameMode("")} />;
  }
  if (gameMode === "multiplayer") {
    return <MultiplayerApp onBack={() => setGameMode("")} />;
  }
}