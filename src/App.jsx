import React, { useState } from "react";
import SinglePlayerApp from "./SinglePlayerApp";
import MultiplayerApp from "./MultiplayerApp";
import BackgroundDots from "./components/BackgroundDots";

function ModeSelectScreen({ onSingle, onMulti }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: 400,
        minWidth: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "none",
        zIndex: 1,
        position: "relative"
      }}
    >
      <div style={{
        fontFamily: "'Permanent Marker', cursive",
        fontSize: "2.4em",
        fontWeight: 900,
        color: "#191919",
        textShadow: "2px 1px 0 #0003",
        marginBottom: 18,
      }}>
        TWENTY DOTS
      </div>
      <button
        onClick={onSingle}
        style={{
          background: "#3498db",
          color: "#fff",
          fontWeight: 700,
          fontSize: "1.25em",
          padding: "15px 40px",
          border: "none",
          borderRadius: 12,
          margin: 8,
          transition: "background 0.2s, box-shadow 0.2s",
          boxShadow: "0 3px 12px #3498db33, 0 2px 4px #0001",
          cursor: "pointer"
        }}
      >Single Player</button>
      <button
        onClick={onMulti}
        style={{
          background: "#27ae60",
          color: "#fff",
          fontWeight: 700,
          fontSize: "1.12em",
          padding: "13px 34px",
          border: "none",
          borderRadius: 12,
          margin: 8,
          transition: "background 0.2s, box-shadow 0.2s",
          boxShadow: "0 3px 12px #27ae6033, 0 2px 4px #0001",
          cursor: "pointer"
        }}
      >Multiplayer</button>
      <div style={{ marginTop: 32, color: "#999", fontSize: "1.05em" }}>
        <span>By dabeejgames</span>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("menu");

  return (
    <>
      {/* Show background only if not on the menu */}
      {screen !== "menu" && <BackgroundDots />}
      {screen === "menu" && (
        <ModeSelectScreen
          onSingle={() => setScreen("single")}
          onMulti={() => setScreen("multi")}
        />
      )}
      {screen === "single" && <SinglePlayerApp onBack={() => setScreen("menu")} />}
      {screen === "multi" && <MultiplayerApp onBack={() => setScreen("menu")} />}
    </>
  );
}