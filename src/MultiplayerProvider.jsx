import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";
import MultiplayerContext from "./MultiplayerContext";

// Helper: returns initial hand structure (array of objects, not nested arrays)
function getInitialHands() {
  return [
    { cards: [null, null, null, null, null] },
    { cards: [null, null, null, null, null] }
  ];
}

// Helper: returns initial discard pile structure
function getInitialDiscardPiles() {
  return [
    { cards: [] },
    { cards: [] }
  ];
}

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
  const [discardPiles, setDiscardPiles] = useState(getInitialDiscardPiles());
  const [dice, setDice] = useState([1, 2]);
  const [showTutorial, setShowTutorial] = useState(false);

  // Listen to Firestore room
  useEffect(() => {
    if (!roomId) return;
    const roomRef = doc(db, "games", roomId);

    // Subscribe to room changes
    const unsub = onSnapshot(roomRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setConnected(true);
        setPlayers(data.players || []);
        setGameState(data.gameState || "waiting");
        setBoardState(data.boardState || []);
        // Defensive: hands as array of objects [{cards: [...]}, ...]
        if (
          Array.isArray(data.hands) &&
          playerIndex >= 0 &&
          playerIndex < data.hands.length &&
          data.hands[playerIndex] &&
          Array.isArray(data.hands[playerIndex].cards)
        ) {
          setHand(data.hands[playerIndex].cards);
        } else {
          setHand([null, null, null, null, null]);
        }
        setActivePlayer(data.activePlayer ?? 0);
        setWinner(data.winner ?? null);
        // Defensive: discardPiles as array of objects [{cards: [...]}, ...]
        setDiscardPiles(
          Array.isArray(data.discardPiles) && data.discardPiles.length === 2
            ? data.discardPiles.map(
                (pile) =>
                  pile && Array.isArray(pile.cards)
                    ? pile
                    : { cards: [] }
              )
            : getInitialDiscardPiles()
        );
        setDice(Array.isArray(data.dice) ? data.dice : [1, 2]);
        setNumPlayers(Array.isArray(data.players) ? data.players.length : 1);
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
      const initialPlayers = [{ name: "Player 1" }];
      const initialState = {
        players: initialPlayers,
        gameState: "waiting",
        boardState: [],
        hands: getInitialHands(),
        activePlayer: 0,
        winner: null,
        discardPiles: getInitialDiscardPiles(),
        dice: [1, 2],
      };
      await setDoc(roomRef, initialState);
      setPlayerIndex(0);
      setPlayers(initialPlayers);
    } else {
      // Join as Player 2 if not already full
      const data = docSnap.data();
      if ((data.players || []).length < 2) {
        await updateDoc(roomRef, {
          players: arrayUnion({ name: "Player 2" })
        });
        setPlayerIndex(1);
      } else {
        setPlayerIndex(-1); // Room full
      }
    }
  }

  // Send a game action (e.g., move)
  async function sendGameAction(action) {
    if (!roomId) return;
    const roomRef = doc(db, "games", roomId);
    // You'll need to implement how you want to store actions or update state!
    // For example:
    // await updateDoc(roomRef, { ...newGameStateAfterAction });
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