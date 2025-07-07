import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc, onSnapshot, arrayUnion } from "firebase/firestore";

const MultiplayerContext = createContext();

export function MultiplayerProvider({ children }) {
  const [roomId, setRoomId] = useState("");
  const [game, setGame] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [playerIndex, setPlayerIndex] = useState(-1);

  // Join or create a room
  async function joinRoom(inputRoomId, name) {
    setRoomId(inputRoomId);
    setPlayerName(name);
    const roomRef = doc(db, "games", inputRoomId);
    const docSnap = await getDoc(roomRef);

    if (!docSnap.exists()) {
  // Create the room if it doesn't exist
  await setDoc(roomRef, {
    players: [{ name: "Player 1" }],
    gameState: "waiting",
    boardState: [],
    hands: [
      { cards: [null, null, null, null, null] },
      { cards: [null, null, null, null, null] }
    ],
    activePlayer: 0,
    winner: null,
    discardPiles: [
      { cards: [] },
      { cards: [] }
    ],
    dice: [1, 2],
  });
  setPlayerIndex(0);
}
    }
    // Listen for game state
    onSnapshot(roomRef, (snap) => setGame(snap.data()));
  }

  // Send a move
  async function sendMove(move) {
    if (roomId) {
      const roomRef = doc(db, "games", roomId);
      await updateDoc(roomRef, { moves: arrayUnion({ player: playerName, move, ts: Date.now() }) });
    }
  }

  return (
    <MultiplayerContext.Provider value={{
      roomId,
      game,
      playerName,
      playerIndex,
      joinRoom,
      sendMove,
    }}>
      {children}
    </MultiplayerContext.Provider>
  );
}

export function useMultiplayer() {
  return useContext(MultiplayerContext);
}