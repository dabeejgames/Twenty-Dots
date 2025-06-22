import React, { useState } from "react";
import TwentyDotsLogo from "./components/TwentyDotsLogo";
import BackgroundDots from "./components/BackgroundDots";
import Board from "./components/Board";
import PlayerArea from "./components/PlayerArea";
import Dice from "./components/Dice";
import Scoreboard from "./components/Scoreboard";
import TutorialModal from "./components/TutorialModal";
import "./App.css";

export default function SinglePlayerApp({ onBack }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [mode, setMode] = useState("easy");
  // Add your game state hooks here, e.g. board, hand, players, winner, etc.

  // Example state (replace with your real state logic)
  const [players] = useState([
    { name: "Player 1", isAI: false },
    { name: "AI", isAI: true }
  ]);
  const [gameState] = useState("playing");
  const [boardState] = useState([]);
  const [hand] = useState([null, null, null, null, null]);
  const [activePlayer] = useState(0);
  const [winner] = useState(null);
  const [discardPiles] = useState([[], []]);
  const [dice] = useState([1, 2]);
  const [showTutorial, setShowTutorial] = useState(false);

  // You may want to use showInstructions OR showTutorial for the modal.
  // Here, showInstructions is used for the tab.

  return (
    <div className="app-root dots-bg">
      <BackgroundDots />

      {/* Top bar with Logo, Mode selector, and Instructions tab */}
      <div
        className="header-bar"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          maxWidth: 420,
          margin: "0 auto",
          padding: "8px 0 0 0",
        }}
      >
        <button
          style={{
            background: "#f03c3c",
            color: "#fff",
            border: "none",
            borderRadius: 7,
            fontWeight: 700,
            fontSize: "1em",
            padding: "4px 13px",
            marginRight: 10,
            boxShadow: "0 2px 6px #0002",
          }}
          onClick={onBack}
        >
          Back
        </button>
        <TwentyDotsLogo />
        <div style={{ flex: 1 }} />
        <button
          style={{
            background: "none",
            border: "none",
            color: "#2b71e7",
            fontWeight: 700,
            fontSize: "1.1em",
            textDecoration: "underline",
            cursor: "pointer",
            padding: "4px 16px",
            borderRadius: "8px",
            marginRight: 2,
            transition: "background 0.2s",
          }}
          onClick={() => setShowInstructions(true)}
        >
          Instructions
        </button>
      </div>

      {/* Mode selector */}
      <div className="mode-selector-row" style={{ marginTop: 8, marginBottom: 6 }}>
        Mode:
        <button
          className={`mode-btn ${mode === "easy" ? "active" : ""}`}
          style={{
            marginLeft: 8,
            marginRight: 2,
            fontWeight: mode === "easy" ? 700 : 500,
          }}
          onClick={() => setMode("easy")}
        >
          Easy
        </button>
        <button
          className={`mode-btn ${mode === "hard" ? "active" : ""}`}
          style={{
            marginLeft: 2,
            fontWeight: mode === "hard" ? 700 : 500,
          }}
          onClick={() => setMode("hard")}
        >
          Hard
        </button>
      </div>

      {/* Scoreboard */}
      <div className="scoreboard-row" style={{ marginBottom: 12 }}>
        <Scoreboard players={players} />
      </div>

      {/* Main game area */}
      <div className="game-main" style={{ display: "flex", flexDirection: "row" }}>
        <div className="dice-side" style={{ marginRight: 22 }}>
          <Dice
            dice={dice}
            gameState={gameState}
            activePlayer={activePlayer}
            playerIndex={0}
            mode={mode}
            // sendGameAction={sendGameAction}
          />
          {winner && (
            <div className="fancy-winner">
              <span className="winner-text">
                {winner} wins!{" "}
                <span className="confetti-emoji" role="img" aria-label="confetti">
                  🎉
                </span>
              </span>
            </div>
          )}
        </div>
        <div className="main-area" style={{ flex: 1 }}>
          <Board
            boardState={boardState}
            activePlayer={activePlayer}
            playerIndex={0}
            // sendGameAction={sendGameAction}
            gameState={gameState}
            mode={mode}
          />
          <div className="player-hand-row" style={{ marginTop: 16 }}>
            {(hand || []).map((card, idx) =>
              card ? (
                <div key={idx} className={`player-card player-card-${card.color}`}>
                  {card.row}
                  {card.col}
                </div>
              ) : (
                <div key={idx + "empty"} className="player-card player-card-empty">
                  {" "}
                </div>
              )
            )}
          </div>
        </div>
        <div className="player-areas-section" style={{ marginLeft: 24 }}>
          <PlayerArea
            player={players[0]}
            isActive={activePlayer === 0 && gameState === "playing"}
            discardPile={discardPiles[0]}
            mode={mode}
          />
          <PlayerArea
            player={players[1]}
            isActive={activePlayer === 1 && gameState === "playing"}
            discardPile={discardPiles[1]}
            isAI={players[1]?.isAI}
            mode={mode}
          />
        </div>
      </div>

      {/* Instructions Modal */}
      <TutorialModal open={showInstructions} onClose={() => setShowInstructions(false)} />

      <footer className="app-footer" style={{ marginTop: 24 }}>
        <span>
          Made with <span className="emoji">💡</span> by dabeejgames &amp; Copilot
        </span>
      </footer>
    </div>
  );
}