import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc, setDoc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";

const MultiplayerContext = createContext();

export function MultiplayerProvider({ children }) {
  const [connected, setConnected] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [numPlayers, setNumPlayers] = useState(1);

  // Game state
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

  // Listen to Firestore room
  useEffect(() => {
    if (!roomId) return;
    const roomRef = doc(db, "games", roomId);

    const unsub = onSnapshot(roomRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setConnected(true);
        setPlayers(data.players || []);
        setNumPlayers(Array.isArray(data.players) ? data.players.length : 1);
        setGameState(data.gameState || "waiting");
        setBoardState(data.boardState || []);
        setHand(
          data.hands && playerIndex >= 0 && playerIndex < data.hands.length
            ? data.hands[playerIndex]
            : [null, null, null, null, null]
        );
        setActivePlayer(data.activePlayer ?? 0);
        setWinner(data.winner ?? null);
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
    const roomRef = doc(db, "games", newRoomId);
    const docSnap = await getDoc(roomRef);

    if (!docSnap.exists()) {
      // Create the room if it doesn't exist
      await setDoc(roomRef, {
        players: [{ name: "Player 1" }],
        gameState: "waiting",
        boardState: [],
        hands: [[null, null, null, null, null], [null, null, null, null, null]],
        activePlayer: 0,
        winner: null,
        discardPiles: [[], []],
        dice: [1, 2],
      });
      setPlayerIndex(0);
      setNumPlayers(1);
    } else {
      // Join as Player 2 if not already full
      const data = docSnap.data();
      if ((data.players || []).length < 2) {
        await updateDoc(roomRef, {
          players: arrayUnion({ name: "Player 2" })
        });
        setPlayerIndex(1);
        setNumPlayers((data.players || []).length + 1);
      } else {
        setPlayerIndex(-1); // Room full
        setNumPlayers((data.players || []).length);
      }
    }
  }

  // Send a game action (to be implemented as needed)
  async function sendGameAction(action) {
    if (!roomId) return;
    const roomRef = doc(db, "games", roomId);
    // Implement your game action logic here
  }

  return (
    <MultiplayerContext.Provider value={{
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
      setShowTutorial
    }}>
      {children}
    </MultiplayerContext.Provider>
  );
}

export function useMultiplayer() {
  return useContext(MultiplayerContext);
}