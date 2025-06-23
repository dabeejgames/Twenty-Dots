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

// Defensive check utility
function safeArray(arr, fallback = []) {
  return Array.isArray(arr) ? arr : fallback;
}

function GameInterface({ onBack }) {
  const {
    connected,
    roomId,
    numPlayers,
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

  // For debugging: see all multiplayer state in the browser console
  if (typeof window !== "undefined") {
    window._multiplayerDebug = {
      connected,
      roomId,
      numPlayers,
      playerIndex,
      players,
      gameState,
      boardState,
      hand,
      activePlayer,
      winner,
      discardPiles,
      dice,
    };
    // Uncomment to log every render:
    // console.log("Multiplayer state:", window._multiplayerDebug);
  }

  const [mode, setMode] = useState("easy");

  // If room is full, show message
  if (playerIndex === -1) {
    return (
      <div className="app-content">
        <h2>Room is full!</h2>
        <button className="back-btn" onClick={onBack}>Back</button>
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
      <div className="app-content">
        <RoomJoiner
          joinRoom={joinRoom}
          connected={connected}
          roomId={roomId}
          numPlayers={numPlayers}
        />
      </div>
    );
  }

  if (!safePlayers.length || !safeHand.length || !safeDiscardPiles.length) {
    return (
      <div className="app-content">
        <div>Loading multiplayer data...</div>
        <button className="back-btn" onClick={onBack}>Back</button>
      </div>
    );
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
      <RoomJoiner
        joinRoom={joinRoom}
        connected={connected}
        roomId={roomId}
        numPlayers={numPlayers}
      />
      <div className="scoreboard-row">
        <Scoreboard players={safePlayers} />
      </div>
      <div className="game-main">
        <div className="dice-side">
          <Dice
            dice={safeDice}
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
            boardState={safeBoardState}
            activePlayer={activePlayer}
            playerIndex={playerIndex}
            sendGameAction={sendGameAction}
            gameState={gameState}
            mode={mode}
          />
          <div className="player-hand-row">
            {safeHand.map((card, idx) =>
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
          {safePlayers[0] && (
            <PlayerArea
              player={safePlayers[0]}
              isActive={activePlayer === 0 && gameState === "playing"}
              discardPile={safeDiscardPiles[0]}
              mode={mode}
            />
          )}
          {safePlayers[1] && (
            <PlayerArea
              player={safePlayers[1]}
              isActive={activePlayer === 1 && gameState === "playing"}
              discardPile={safeDiscardPiles[1]}
              isAI={safePlayers[1]?.isAI}
              mode={mode}
            />
          )}
        </div>
      </div>
      <footer className="app-footer">
        <span>Made with <span className="emoji">💡</span> by dabeejgames &amp; Copilot</span>
      </footer>
    </div>
  );
}

export default function MultiplayerApp({ onBack }) {
  return (
    <MultiplayerProvider>
      <div className="app-root dots-bg">
        <BackgroundDots />
        <GameInterface onBack={onBack} />
      </div>
    </MultiplayerProvider>
  );
}