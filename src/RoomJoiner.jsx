import React, { useState } from "react";
import "./RoomJoiner.css";

export default function RoomJoiner({ joinRoom, connected, roomId, numPlayers }) {
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  // Build invite link (change yourdomain.com to your app’s actual domain or use window.location)
  const inviteLink = roomId
    ? `${window.location.origin}${window.location.pathname}?room=${encodeURIComponent(roomId)}`
    : "";

  const handleCopy = async () => {
    if (!inviteLink) return;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(inviteLink);
    } else {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = inviteLink;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <h2>Multiplayer Room</h2>
      <div className="room-joiner-container">
        <input
          type="text"
          placeholder="Enter room code"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <button
          disabled={!connected || !code}
          onClick={() => joinRoom(code)}
        >
          Join Room
        </button>
      </div>
      {roomId && (
        <div className="invite-room-info">
          <b>Room:</b> <span style={{ color: "#3e6ff4" }}>{roomId}</span>
          <br />
          <b>Players in room:</b> {numPlayers}
          <br />
          <button className="copy-invite-btn" onClick={handleCopy}>
            {copied ? "Link Copied!" : "Copy Invite Link"}
          </button>
          <div className="invite-link-small">{inviteLink}</div>
        </div>
      )}
    </div>
  );
}