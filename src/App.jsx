import React, { useState } from "react";
import SinglePlayerApp from "./SinglePlayerApp";
import MultiplayerApp from "./MultiplayerApp";

export default function App() {
  const [gameMode, setGameMode] = useState("");

  if (!gameMode) {
    return (
      <div className="mode-select-screen" style={{ textAlign: "center", marginTop: "3rem" }}>
        <h1>TWENTY DOTS</h1>
        <button onClick={() => setGameMode("ai")} style={{ margin: "1rem", padding: "1rem 2rem" }}>Play vs AI</button>
        <button onClick={() => setGameMode("multiplayer")} style={{ margin: "1rem", padding: "1rem 2rem" }}>Play Multiplayer</button>
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