import React, { useState } from "react";
import TwentyDotsLogo from "./components/TwentyDotsLogo";
import BackgroundDots from "./components/BackgroundDots";
import Board from "./components/Board";
import PlayerArea from "./components/PlayerArea";
import Dice from "./components/Dice";
import Scoreboard from "./components/Scoreboard";
import TutorialModal from "./components/TutorialModal";
import "./App.css";

// Stub AI move logic: replace this with your actual logic!
function makeAIMove(currentBoardState, aiHand, gameState) {
  // Example: randomly play a card or make a move.
  // Return an object describing the move to make.
  // You must implement your own logic here.
  return null;
}

export default function SinglePlayerApp({ onBack }) {
  // Local state for single player game
  const [showTutorial, setShowTutorial] = useState(false);
  const [mode, setMode] = useState("easy");
  const [gameState, setGameState] = useState("playing");
  const [boardState, setBoardState] = useState(/* initial board state */);
  const [players, setPlayers] = useState([
    { name: "You", score: 0 },
    { name: "AI", score: 0 }
  ]);
  const [hand, setHand] = useState(/* initial hand */);
  const [aiHand, setAIHand] = useState(/* initial AI hand */);
  const [activePlayer, setActivePlayer] = useState(0);
  const [discardPiles, setDiscardPiles] = useState([[], []]);
  const [dice, setDice] = useState(/* initial dice state */);
  const [winner, setWinner] = useState(null);

  // Handle player move
  function handlePlayerMove(move) {
    // Update board state, hand, etc. based on move
    // Check for win, update scores, etc.
    // If game not over, set activePlayer to 1 (AI), then trigger AI move
    setActivePlayer(1);

    setTimeout(() => {
      handleAIMove();
    }, 500); // slight delay for realism
  }

  // Handle AI move
  function handleAIMove() {
    if (gameState !== "playing") return;
    const aiMove = makeAIMove(boardState, aiHand, gameState);
    if (!aiMove) {
      // End turn if no move possible
      setActivePlayer(0);
      return;
    }
    // Update board state, AI hand, etc. using aiMove
    // Check for win, update scores, etc.
    // Switch back to human player
    setActivePlayer(0);
  }

  return (
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
  );
}