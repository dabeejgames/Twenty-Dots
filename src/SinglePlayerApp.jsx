import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import PlayerArea from "./components/PlayerArea";
import Dice from "./components/Dice";
import TutorialModal from "./components/TutorialModal";
import { BOARD_ROWS, BOARD_COLS, BOARD_LOCATIONS, generateDeck } from "./game/constants";
import "./App.css";

function TwentyDotsLogo({ style }) {
  return (
    <div style={{ textAlign: "center", margin: "10px auto 0 auto", ...style }}>
      <div style={{
        fontFamily: "'Permanent Marker', 'Comic Sans MS', cursive, sans-serif",
        fontSize: "2.0em", fontWeight: 900,
        letterSpacing: "0.04em", color: "#191919",
        textShadow: "2px 1px 0 #0003", lineHeight: 1.08, userSelect: "none",
      }}>
        TWENTY
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: "-0.12em" }}>
        {["d", "o", "t", "s"].map((ch, i) => (
          <span key={i} style={{
            display: "inline-block",
            width: 22, height: 22,
            borderRadius: "50%",
            background: ["#f03c3c", "#4bd247", "#a259d9", "#3498db"][i],
            color: "#fff",
            fontFamily: "'Permanent Marker', 'Comic Sans MS', cursive, sans-serif",
            fontSize: "1em",
            textAlign: "center",
            lineHeight: "22px",
            marginRight: 1,
            boxShadow: "1px 1px 4px #0002"
          }}>{ch}</span>
        ))}
      </div>
    </div>
  );
}

function shuffle(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function findRowsToClear(dots, playerColor) {
  const matches = [];
  const directions = [
    { dr: 0, dc: 1 }, { dr: 1, dc: 0 },
    { dr: 1, dc: 1 }, { dr: 1, dc: -1 },
  ];
  const rows = BOARD_ROWS, cols = BOARD_COLS;
  function matchesColor(cell, c) { return dots[cell] === c || dots[cell] === "yellow"; }
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < cols.length; c++) {
      for (const { dr, dc } of directions) {
        let chain = [];
        for (let k = 0; k < 6; k++) {
          let rr = r + dr * k, cc = c + dc * k;
          if (rr < 0 || rr >= rows.length || cc < 0 || cc >= cols.length) break;
          let cellId = `${rows[rr]}${cols[cc]}`;
          if (matchesColor(cellId, playerColor)) chain.push(cellId);
          else break;
        }
        if (chain.length >= 3) matches.push(chain);
      }
    }
  }
  return Array.from(new Set(matches.flat()));
}

const allColors = ["red", "blue", "green", "purple"];
const colorToPlayerIndex = (color) => {
  if (color === "red" || color === "green") return 0;
  if (color === "blue" || color === "purple") return 1;
  return null;
};

function getInitialPlayer(name) {
  return { name, hand: [], score: 0, red: 0, blue: 0, green: 0, purple: 0 };
}

export default function SinglePlayerApp({ onBack }) {
  const [mode, setMode] = useState("easy");
  const [gameState, setGameState] = useState("waiting-for-dice");
  const [dots, setDots] = useState({});
  const [deck, setDeck] = useState([]);
  const [players, setPlayers] = useState([getInitialPlayer("You"), getInitialPlayer("AI")]);
  const [activePlayer, setActivePlayer] = useState(0);
  const [wildCellId, setWildCellId] = useState(null);
  const [dice, setDice] = useState({ row: null, col: null });
  const [discardPiles, setDiscardPiles] = useState([[], []]);
  const [cardsPlayedThisTurn, setCardsPlayedThisTurn] = useState(0);
  const [locationsPlayedThisTurn, setLocationsPlayedThisTurn] = useState([]);
  const [winner, setWinner] = useState(null);
  const [aiResumeAfterWild, setAiResumeAfterWild] = useState(false);

  // Responsive sizing for board/cards to fit everything on one screen
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    function handleResize() { setWindowSize({ width: window.innerWidth, height: window.innerHeight }); }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = windowSize.width < 700;
  const boardAreaWidth = isMobile ? "97vw" : 230;
  const cardFontSize = isMobile ? "0.81em" : "0.97em";
  const cardWidth = isMobile ? 21 : 30;
  const cardHeight = isMobile ? 26 : 36;

  // Tutorial/hints state
  const [showTutorial, setShowTutorial] = useState(() => localStorage.getItem("tdots_tutorial_seen") ? false : true);
  function handleCloseTutorial() {
    setShowTutorial(false);
    localStorage.setItem("tdots_tutorial_seen", "yes");
  }

  // Reset state for new game or mode change
  useEffect(() => {
    const shuffledDeck = shuffle(generateDeck());
    setPlayers([
      { ...getInitialPlayer("You"), hand: shuffledDeck.slice(0, 5) },
      { ...getInitialPlayer("AI"), hand: shuffledDeck.slice(5, 10) },
    ]);
    setDeck(shuffledDeck.slice(10));
    setDots({});
    setActivePlayer(0);
    setWildCellId(null);
    setDice({ row: null, col: null });
    setDiscardPiles([[], []]);
    setCardsPlayedThisTurn(0);
    setLocationsPlayedThisTurn([]);
    setWinner(null);
    setAiResumeAfterWild(false);
    setGameState("waiting-for-dice");
  }, [mode]);

  function drawCards(hand, n) {
    let newHand = [...hand];
    let newDeck = [...deck];
    for (let i = 0; i < n && newDeck.length > 0; i++) newHand.push(newDeck.shift());
    setDeck(newDeck);
    return newHand;
  }

  function awardPoints(playerArr, playerIdx, color, count) {
    let updated = [...playerArr];
    updated[playerIdx] = { ...updated[playerIdx], score: updated[playerIdx].score + count };
    if (color && allColors.includes(color)) updated[playerIdx][color] += count;
    return updated;
  }

  function checkAndClearAllRowsAfterWild(newDots, oldWildCellId = null) {
    let updatedDots = { ...newDots };
    let updatedPlayers = [...players];
    let wildCleared = false;
    allColors.forEach((color) => {
      const cellsToClear = findRowsToClear(updatedDots, color);
      if (cellsToClear.length > 0) {
        const owner = colorToPlayerIndex(color);
        if (owner !== null) updatedPlayers = awardPoints(updatedPlayers, owner, color, cellsToClear.length);
        cellsToClear.forEach((id) => {
          if (oldWildCellId && id === oldWildCellId) wildCleared = true;
          delete updatedDots[id];
        });
      }
    });
    return { updatedDots, updatedPlayers, wildCleared };
  }

  // WIN DETECTION
  useEffect(() => {
    if (gameState === "game-over") return;
    for (let i = 0; i < players.length; i++) {
      if ((mode === "easy" && players[i].score >= 20) ||
        (mode === "hard" && allColors.every((col) => players[i][col] >= 5))) {
        setWinner(players[i].name);
        setGameState("game-over");
        break;
      }
    }
  }, [players, gameState, mode]);

  function handleRollDice(forceAiResume = false) {
    if ((gameState !== "waiting-for-dice" && !forceAiResume) || wildCellId) return;
    let openCells = BOARD_LOCATIONS.map(loc => loc.id).filter(id => !dots[id]);
    if (openCells.length === 0) return;
    const idx = Math.floor(Math.random() * openCells.length);
    const cell = openCells[idx];
    let newDots = { ...dots, [cell]: "yellow" };
    setDice({ row: cell[0], col: Number(cell.slice(1)) });

    const { updatedDots, updatedPlayers, wildCleared } = checkAndClearAllRowsAfterWild(newDots, cell);
    setDots(updatedDots);
    setPlayers(updatedPlayers);

    if (wildCleared) {
      setWildCellId(null);
      setGameState("waiting-for-dice");
    } else {
      setWildCellId(cell);
      setGameState("playing");
      if (aiResumeAfterWild) {
        setTimeout(() => {
          setAiResumeAfterWild(false);
          setActivePlayer(1);
        }, 400);
      }
    }
  }

  function handleCardClick(idx) {
    if (
      gameState !== "playing" ||
      activePlayer !== 0 ||
      cardsPlayedThisTurn >= 2
    ) return;

    const card = players[0].hand[idx];
    const cellId = `${card.row}${card.col}`;
    const prevDot = dots[cellId];

    if (locationsPlayedThisTurn.includes(cellId)) return;
    if (!wildCellId) return;

    let newDots = { ...dots, [cellId]: card.color };
    let addScore = 0;
    let wildWasReplaced = false;
    let colorCounts = { red: 0, blue: 0, green: 0, purple: 0 };

    if (prevDot && prevDot !== "yellow") {
      addScore = 1;
      if (allColors.includes(prevDot)) colorCounts[prevDot] += 1;
    }
    if (prevDot === "yellow") {
      wildWasReplaced = true;
      addScore += 1;
    }

    setDiscardPiles(prev => {
      const newPiles = [...prev];
      newPiles[0] = [card, ...newPiles[0]].slice(0, 2);
      return newPiles;
    });

    const newHand = players[0].hand.slice();
    newHand.splice(idx, 1);

    const cellsToClear = findRowsToClear(newDots, card.color);
    let wildClearedByRow = false;
    let numCleared = cellsToClear.length;
    if (numCleared > 0) {
      for (const id of cellsToClear) {
        if (id === wildCellId) wildClearedByRow = true;
        colorCounts[card.color] += 1;
        delete newDots[id];
      }
      addScore += numCleared;
    }

    setPlayers(prev => [
      {
        ...prev[0],
        hand: newHand,
        score: prev[0].score + addScore,
        red: prev[0].red + colorCounts.red,
        blue: prev[0].blue + colorCounts.blue,
        green: prev[0].green + colorCounts.green,
        purple: prev[0].purple + colorCounts.purple,
      },
      prev[1]
    ]);

    setDots(newDots);
    setCardsPlayedThisTurn(n => n + 1);
    setLocationsPlayedThisTurn(prev => [...prev, cellId]);

    if (wildWasReplaced || wildClearedByRow) {
      setWildCellId(null);
      setGameState("waiting-for-dice");
    }
  }

  function endTurn() {
    setPlayers(prev => [
      { ...prev[0], hand: drawCards(prev[0].hand, 2) },
      prev[1]
    ]);
    setCardsPlayedThisTurn(0);
    setLocationsPlayedThisTurn([]);
    setActivePlayer(1);
  }

  useEffect(() => {
    if (activePlayer === 0 && cardsPlayedThisTurn === 2 && gameState === "playing") {
      setTimeout(endTurn, 700);
    }
  }, [cardsPlayedThisTurn, gameState]);

  useEffect(() => {
    if (activePlayer === 1 && gameState === "playing") {
      let aiPlays = 0;
      let aiHand = [...players[1].hand];
      let newDots = { ...dots };
      let aiDiscards = [...discardPiles[1]];
      let ai = { ...players[1] };
      let localWildCellId = wildCellId;
      let wildWasReplaced = false;
      let wildClearedByRow = false;
      let aiLocationsPlayedThisTurn = [];

      for (let i = 0; i < aiHand.length && aiPlays < 2; ++i) {
        const card = aiHand[i];
        const cellId = `${card.row}${card.col}`;
        const prevDot = newDots[cellId];

        if (!localWildCellId) break;
        if (aiLocationsPlayedThisTurn.includes(cellId)) continue;

        let addScore = 0;
        let colorCounts = { red: 0, blue: 0, green: 0, purple: 0 };
        if (prevDot && prevDot !== "yellow") {
          addScore += 1;
          if (allColors.includes(prevDot)) colorCounts[prevDot] += 1;
        }
        if (prevDot === "yellow") {
          wildWasReplaced = true;
          addScore += 1;
        }

        aiDiscards = [card, ...aiDiscards].slice(0, 2);
        newDots[cellId] = card.color;

        const cellsToClear = findRowsToClear(newDots, card.color);
        if (cellsToClear.length > 0) {
          for (const id of cellsToClear) {
            if (id === localWildCellId) wildClearedByRow = true;
            colorCounts[card.color] += 1;
            delete newDots[id];
          }
          addScore += cellsToClear.length;
        }
        ai.score += addScore;
        ai.red += colorCounts.red;
        ai.blue += colorCounts.blue;
        ai.green += colorCounts.green;
        ai.purple += colorCounts.purple;
        aiHand.splice(i, 1);
        aiLocationsPlayedThisTurn.push(cellId);
        aiPlays++;
        i--;
        if (wildWasReplaced || wildClearedByRow) break;
      }

      setTimeout(() => {
        setDots(newDots);
        setDiscardPiles(prev => [prev[0], aiDiscards]);
        setPlayers(prev => [
          prev[0],
          { ...ai, hand: drawCards(aiHand, 2) }
        ]);
        setCardsPlayedThisTurn(0);
        setLocationsPlayedThisTurn([]);
        if ((wildWasReplaced) || wildClearedByRow) {
          setWildCellId(null);
          setGameState("waiting-for-dice");
          setAiResumeAfterWild(aiPlays < 2);
        } else {
          setActivePlayer(0);
        }
      }, 400);
    }
  }, [activePlayer, gameState]);

  useEffect(() => {
    if (aiResumeAfterWild && gameState === "waiting-for-dice" && !wildCellId) {
      setTimeout(() => handleRollDice(true), 500);
    }
  }, [aiResumeAfterWild, gameState, wildCellId]);

  return (
    <div className="app-root" style={{
      minHeight: "100vh",
      width: "100vw",
      background: "#e8f3fc",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 0,
    }}>
      {/* Top bar */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "98vw",
        maxWidth: 420,
        padding: "4px 0 0 0",
        marginBottom: 2,
      }}>
        <button style={{
          background: "#f03c3c", color: "#fff", border: "none", borderRadius: 7,
          fontWeight: 700, fontSize: "1em", padding: "4px 13px", margin: 0,
          boxShadow: "0 2px 6px #0002"
        }} onClick={onBack}>Back</button>
        <button style={{
          background: "#2b71e7", color: "#fff", border: "none", borderRadius: "50%",
          width: 32, height: 32, fontWeight: 900, fontSize: "1.2em", margin: 0,
          boxShadow: "0 2px 6px #0002"
        }} onClick={() => setShowTutorial(true)}>?</button>
      </div>
      <TwentyDotsLogo style={{ margin: "0 0 2px 0" }} />

      {/* Scoreboard & Mode */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: 7,
        margin: "2px 0 0 0",
      }}>
        <div style={{
          display: "flex", flexDirection: "row", background: "#fff", borderRadius: 11,
          boxShadow: "0 1.5px 6px #0001", overflow: "hidden",
        }}>
          <div style={{
            padding: "3px 12px", fontWeight: 700, color: "#2b71e7", fontSize: "1em",
            background: "#f7faff", borderRight: "1px solid #dce6f6"
          }}>You<br/>{players[0].score}</div>
          <div style={{
            padding: "3px 12px", fontWeight: 700, color: "#a259d9", fontSize: "1em",
            background: "#f9f6ff"
          }}>AI<br/>{players[1].score}</div>
        </div>
        <div style={{
          background: "#fff", borderRadius: 11, padding: "3px 8px", marginLeft: 2,
          fontWeight: 600, fontSize: "0.93em", color: "#191919", boxShadow: "0 1px 4px #0001"
        }}>
          Mode: <span style={{
            background: mode === "easy" ? "#2ecc71" : "#eee", color: "#fff", borderRadius: 6, padding: "2px 8px", margin: "0 3px", fontWeight: 700 }}>Easy</span>
          <span style={{ color: "#aaa", margin: "0 2px" }}>/</span>
          <span style={{
            background: mode === "hard" ? "#a259d9" : "#eee", color: "#fff", borderRadius: 6, padding: "2px 8px", fontWeight: 700 }}>Hard</span>
        </div>
      </div>

      {/* Board area */}
      <div style={{
        width: boardAreaWidth, maxWidth: 380, margin: "6px 0 0 0", display: "flex", flexDirection: "column", alignItems: "center"
      }}>
        <Board
          dots={dots}
          wildCellId={wildCellId}
          cellSize={isMobile ? 17 : 22}
          style={{
            minWidth: 0, width: "100%", boxSizing: "border-box", margin: "0 auto"
          }}
        />
        {/* Dice and instruction */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          marginTop: 5
        }}>
          <Dice
            letter={dice.row}
            number={dice.col}
            onRoll={() => handleRollDice(false)}
            canRoll={gameState === "waiting-for-dice"}
            style={{
              fontSize: "1em", width: 56, height: 30
            }}
          />
          {gameState === "waiting-for-dice" && (
            <div style={{
              marginTop: 3, padding: "3px 10px", background: "#fffbe8",
              borderRadius: 7, color: "#b48e00", fontWeight: 600,
              fontSize: "0.98em", boxShadow: "0 1px 4px #ffe07f55",
              textAlign: "center"
            }}>
              Roll for wild!
            </div>
          )}
        </div>
      </div>

      {/* Player zones */}
      <div style={{
        display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "flex-start",
        gap: 8, width: "96vw", maxWidth: 380, margin: "10px 0 0 0"
      }}>
        <PlayerArea
          player={players[0]}
          isActive={activePlayer === 0 && gameState === "playing"}
          onCardClick={handleCardClick}
          showHand={true}
          discardPiles={discardPiles[0]}
          mode={mode}
          cardFontSize={cardFontSize}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          style={{
            width: "48vw", minWidth: 0, maxWidth: 160, padding: 4, borderRadius: 12, background: "#fff",
            boxShadow: "0 1px 4px #0001"
          }}
        />
        <PlayerArea
          player={players[1]}
          isActive={activePlayer === 1 && gameState === "playing"}
          showHand={false}
          discardPiles={discardPiles[1]}
          isAI
          mode={mode}
          cardFontSize={cardFontSize}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          style={{
            width: "48vw", minWidth: 0, maxWidth: 160, padding: 4, borderRadius: 12, background: "#fff",
            boxShadow: "0 1px 4px #0001"
          }}
        />
      </div>

      {/* Footer */}
      <footer className="app-footer"
        style={{
          background: "#222c3c",
          color: "#fff",
          textAlign: "center",
          padding: "6px 0 4px 0",
          fontSize: "1em",
          letterSpacing: "1px",
          marginTop: 14,
          width: "100%",
          flexShrink: 0,
        }}
      >
        <span>Made with <span className="emoji">💡</span> by dabeejgames & Copilot</span>
      </footer>
    </div>
  );
}