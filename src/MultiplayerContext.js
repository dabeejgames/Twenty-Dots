import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc, setDocTEST, updateDoc, onSnapshot, arrayUnion } from "firebase/firestore";

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
      // Create new room
      await setDocTEST(roomRef, { players: [name], moves: [] });
      setPlayerIndex(0);
    } else {
      // Join if room not full
      const data = docSnap.data();
      if ((data.players || []).length < 2 && !data.players.includes(name)) {
        await updateDoc(roomRef, { players: arrayUnion(name) });
        setPlayerIndex(1);
      } else {
        alert("Room full or you already joined.");
        setPlayerIndex(-1);
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