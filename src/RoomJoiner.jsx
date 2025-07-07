import React, { useState } from "react";

export default function RoomJoiner({ joinRoom, connected, roomId, numPlayers }) {
  const [input, setInput] = useState("");

  function handleJoin(e) {
    e.preventDefault();
    if (input.trim()) {
      joinRoom(input.trim());
      setInput(""); // Clear input after joining
    }
  }

  return (
    <div className="room-joiner">
      {connected ? (
        <div>
          <span>Room ID: <b>{roomId}</b></span>
          <span style={{ marginLeft: 12 }}>Players: {numPlayers ?? "-"}</span>
        </div>
      ) : (
        <form onSubmit={handleJoin}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter Room Code"
            className="room-input"
          />
          <button type="submit" className="join-btn">Join Room</button>
        </form>
      )}
    </div>
  );
}