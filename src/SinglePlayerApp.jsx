import React, { useState } from "react";
import TwentyDotsLogo from "./components/TwentyDotsLogo";
import BackgroundDots from "./components/BackgroundDots";
import Board from "./components/Board";
import PlayerArea from "./components/PlayerArea";
import Dice from "./components/Dice";
import Scoreboard from "./components/Scoreboard";
import TutorialModal from "./components/TutorialModal";
import "./App.css";

// Example initial state – adapt to your actual game!
const initialBoardState = [/* ... */];
const initialHand = [/* ... */];
const initialAIHand = [/* ... */];
const initialDiscardPiles = [[], []];
const initialPlayers = [
  { name: "You", score: 0 },
  { name: "AI", score: 0 }
];
const initialDice = [null, null];

function makeAIMove(boardState, aiHand, gameState) {
  // TODO: Implement your AI logic here!
  return null;
}

export default function SinglePlayerApp({ onBack }) {
  const [showTutorial, setShowTutorial] = useState(false);
  const [mode, setMode] = useState("easy");
  const [gameState, setGameState] = useState("playing");
  const [boardState, setBoardState] = useState(initialBoardState);
  const [players, setPlayers] = useState(initialPlayers);
  const [hand, setHand] = useState(initialHand);
  const [aiHand, setAIHand] = useState(initialAIHand);
  const [activePlayer, setActivePlayer] = useState(0);
  const [discardPiles, setDiscardPiles] = useState(initialDiscardPiles);
  const [dice, setDice] = useState(initialDice);
  const [winner, setWinner] = useState(null);

  // Run after human move
  function handlePlayerMove(move) {
    // TODO: Update boardState, hand, etc.
    setActivePlayer(1);
    setTimeout(handleAIMove, 500); // Let AI respond
  }

  // AI logic
  function handleAIMove() {
    if (gameState !== "playing") return;
    const aiMove = makeAIMove(boardState, aiHand, gameState);
    if (!aiMove) {
      setActivePlayer(0);
      return;
    }
    // TODO: Update boardState, aiHand, etc. with aiMove
    setActivePlayer(0);
  }

  return (
    <div className="app-root dots-bg">
      <BackgroundDots />
      <div className="app-content">
        <TutorialModal open={showTutorial} onClose={() => setShowTutorial(false)} />
        <button
          aria-label="Show tutorial"
          className="help-btn"
          title="Show game tutorial"
          onClick={() => setShowTutorial(true)}
        >?</button>
        <button className="back-btn" onClick={onBack}>Back</button>
        <div className="header-bar">
          <TwentyDotsLogo />
          <div className="mode-selector-row">
            Mode:
            <button
              className={`mode-btn ${mode === "easy" ? "active" : ""}`}
              onClick={() => setMode("easy")}
            >
              Easy
            </button>
            <button
              className={`mode-btn ${mode === "hard" ? "active" : ""}`}
              onClick={() => setMode("hard")}
            >
              Hard
            </button>
          </div>
        </div>
        <div className="scoreboard-row">
          <Scoreboard players={players} />
        </div>
        <div className="game-main">
          <div className="dice-side">
            <Dice
              dice={dice}
              gameState={gameState}
              sendGameAction={handlePlayerMove}
              activePlayer={activePlayer}
              playerIndex={0}
              mode={mode}
            />
            {winner && (
              <div className="fancy-winner">
                <span className="winner-text">{winner} wins! <span className="confetti-emoji" role="img" aria-label="confetti">🎉</span></span>
              </div>
            )}
          </div>
          <div className="main-area">
            <Board
              boardState={boardState}
              activePlayer={activePlayer}
              playerIndex={0}
              sendGameAction={handlePlayerMove}
              gameState={gameState}
              mode={mode}
            />
            <div className="player-hand-row">
              {(hand || []).map((card, idx) =>
                card ? (
                  <div key={idx} className={`player-card player-card-${card.color}`}>
                    {card.row}{card.col}
                  </div>
                ) : (
                  <div key={idx + "empty"} className="player-card player-card-empty"> </div>
                )
              )}
            </div>
          </div>
          <div className="player-areas-section">
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
              isAI
              mode={mode}
            />
          </div>
        </div>
        <footer className="app-footer">
          <span>Made with <span className="emoji">💡</span> by dabeejgames &amp; Copilot</span>
        </footer>
      </div>
    </div>
  );
}