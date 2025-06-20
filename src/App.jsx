import React, { useState } from "react";
import TwentyDotsLogo from "./components/TwentyDotsLogo";
import BackgroundDots from "./components/BackgroundDots";
import Board from "./components/Board";
import PlayerArea from "./components/PlayerArea";
import Dice from "./components/Dice";
import Scoreboard from "./components/Scoreboard";
import TutorialModal from "./components/TutorialModal";
import { MultiplayerProvider, useMultiplayer } from "./MultiplayerProvider";
import RoomJoiner from "./RoomJoiner";
import "./App.css";

function GameInterface() {
  const {
    connected,
    roomId,
    numPlayers,
    joinRoom,
    sendGameAction,
    gameActions,
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

  // Mode state: "easy" or "hard"
  const [mode, setMode] = useState("easy");

  return (
    <div className="app-content">
      <TutorialModal open={showTutorial} onClose={() => setShowTutorial(false)} />
      <button
        aria-label="Show tutorial"
        className="help-btn"
        title="Show game tutorial"
        onClick={() => setShowTutorial(true)}
      >?</button>
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
      <RoomJoiner
        joinRoom={joinRoom}
        connected={connected}
        roomId={roomId}
        numPlayers={numPlayers}
      />
      <div className="scoreboard-row">
        <Scoreboard players={players} />
      </div>
      <div className="game-main">
        <div className="dice-side">
          <Dice
            dice={dice}
            gameState={gameState}
            sendGameAction={sendGameAction}
            activePlayer={activePlayer}
            playerIndex={playerIndex}
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
            playerIndex={playerIndex}
            sendGameAction={sendGameAction}
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

export default function App() {
  return (
    <MultiplayerProvider>
      <div className="app-root dots-bg">
        <BackgroundDots />
        <GameInterface />
      </div>
    </MultiplayerProvider>
  );
}