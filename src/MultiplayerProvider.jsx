import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

// Provide the server URL (change if deployed!)
const SERVER_URL = "http://localhost:4000";

// Context so any component can use multiplayer events/state
const MultiplayerContext = createContext();

export function MultiplayerProvider({ children }) {
  const socketRef = useRef();
  const [connected, setConnected] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [numPlayers, setNumPlayers] = useState(1);
  const [gameActions, setGameActions] = useState([]); // history of actions

  // --- Add application/game state defaults here ---
  const [playerIndex, setPlayerIndex] = useState(0); // For demo
  const [players, setPlayers] = useState(["Player 1", "Player 2"]);
  const [gameState, setGameState] = useState("waiting"); // "waiting" | "playing" | etc.
  const [boardState, setBoardState] = useState([]); // Example: [] or your actual board structure
  const [hand, setHand] = useState([null, null, null, null, null]); // Example: 5 card hand
  const [activePlayer, setActivePlayer] = useState(0);
  const [winner, setWinner] = useState(null);
  const [discardPiles, setDiscardPiles] = useState([[], []]);
  const [dice, setDice] = useState([1, 2]);
  const [showTutorial, setShowTutorial] = useState(false);

  // Connect to server on mount
  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    socketRef.current.on("connect", () => setConnected(true));
    socketRef.current.on("disconnect", () => setConnected(false));
    socketRef.current.on("players", (count) => setNumPlayers(count));
    socketRef.current.on("game-action", (action) => {
      setGameActions(actions => [...actions, action]);
      // Optionally, update other state here based on action type
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  // Join a room
  function joinRoom(newRoomId) {
    setRoomId(newRoomId);
    socketRef.current.emit("join-room", newRoomId);
  }

  // Send a game action to the server/room
  function sendGameAction(action) {
    if (roomId) {
      socketRef.current.emit("game-action", { roomId, action });
      setGameActions(actions => [...actions, action]);
    }
  }

  return (
    <MultiplayerContext.Provider value={{
      connected,
      roomId,
      numPlayers,
      joinRoom,
      sendGameAction,
      gameActions,
      // --- Add all these values so your App doesn't crash ---
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

// Custom hook for easy use in components
export function useMultiplayer() {
  return useContext(MultiplayerContext);
}