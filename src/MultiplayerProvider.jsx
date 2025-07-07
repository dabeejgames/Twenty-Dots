import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, onValue, set, get, update } from "firebase/database";

// Context setup
const MultiplayerContext = createContext();
export function useMultiplayer() {
  return useContext(MultiplayerContext);
}

export function MultiplayerProvider({ children }) {
  const [connected, setConnected] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [playerIndex, setPlayerIndex] = useState(0);
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState("waiting");
  const [boardState, setBoardState] = useState([]);
  const [hand, setHand] = useState([null, null, null, null, null]);
  const [activePlayer, setActivePlayer] = useState(0);
  const [winner, setWinner] = useState(null);
  const [discardPiles, setDiscardPiles] = useState([[], []]);
  const [dice, setDice] = useState([1, 2]);
  const [showTutorial, setShowTutorial] = useState(false);

  // Listen to RTDB room
  useEffect(() => {
    if (!roomId) return;
    const roomRef = ref(db, `games/${roomId}`);
    const unsub = onValue(roomRef, (snap) => {
      const data = snap.val();
      if (data) {
        setConnected(true);
        setPlayers(data.players || []);
        setGameState(data.gameState || "waiting");
        setBoardState(data.boardState || []);
        setHand(
          Array.isArray(data.hands) && playerIndex >= 0 && playerIndex < data.hands.length
            ? data.hands[playerIndex]
            : [null, null, null, null, null]
        );
        setActivePlayer(data.activePlayer || 0);
        setWinner(data.winner || null);
        setDiscardPiles(data.discardPiles || [[], []]);
        setDice(data.dice || [1, 2]);
      } else {
        setConnected(false);
      }
    });
    return () => unsub();
  }, [roomId, playerIndex]);

  // Join a room or create if it doesn't exist
  async function joinRoom(newRoomId) {
    setRoomId(newRoomId);
    const roomRef = ref(db, `games/${newRoomId}`);
    const snap = await get(roomRef);

    if (!snap.exists()) {
      // Create the room if it doesn't exist
      const initialData = {
        players: [{ name: "Player 1" }],
        gameState: "waiting",
        boardState: [],
        hands: [
          [null, null, null, null, null],
          [null, null, null, null, null]
        ],
        activePlayer: 0,
        winner: null,
        discardPiles: [[], []],
        dice: [1, 2],
      };
      await set(roomRef, initialData);
      setPlayerIndex(0);
    } else {
      // Join as Player 2 if not already full
      const data = snap.val();
      if ((data.players || []).length < 2) {
        const newPlayers = [...(data.players || []), { name: "Player 2" }];
        await update(roomRef, { players: newPlayers });
        setPlayerIndex(1);
      } else {
        setPlayerIndex(-1); // Room full
      }
    }
  }

  // Send a game action (e.g., move)
  async function sendGameAction(action) {
    if (!roomId) return;
    const roomRef = ref(db, `games/${roomId}`);
    // Implement your game logic here!
    // Example: await update(roomRef, { ...newGameStateAfterAction });
  }

  return (
    <MultiplayerContext.Provider value={{
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
      setShowTutorial
    }}>
      {children}
    </MultiplayerContext.Provider>
  );
}