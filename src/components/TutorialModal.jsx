import React from "react";

export default function TutorialModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div
      className="tutorial-modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(30,40,70,0.65)",
        zIndex: 5000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={onClose}
    >
      <div
        className="tutorial-modal-content"
        style={{
          background: "#fff",
          borderRadius: 16,
          maxWidth: 420,
          width: "93vw",
          maxHeight: "90vh",
          padding: "32px 22px 24px 22px",
          boxShadow: "0 8px 28px #0005",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 18,
            background: "none",
            border: "none",
            fontSize: 28,
            color: "#aaa",
            fontWeight: 700,
            cursor: "pointer",
            lineHeight: "1em",
            zIndex: 1
          }}
          aria-label="Close tutorial"
        >
          &times;
        </button>
        <h2 style={{ marginTop: 0, marginBottom: 14 }}>
          How to Play <span role="img" aria-label="dots">🔵</span>
        </h2>
        <div
          style={{
            overflowY: "auto",
            flex: "1 1 auto",
            minHeight: 0,
            paddingRight: 4,
          }}
        >
          <ol style={{ paddingLeft: 18, fontSize: "1.08em", margin: 0 }}>
            <li>
              <b>Objective:</b> <br />
              <span>
                Collect points by playing colored cards to the board. First to <b>20 points</b> (Easy) or <b>5 of each color</b> (Hard) wins!
              </span>
            </li>
            <li>
              <b>On Your Turn:</b>
              <ul>
                <li>Roll the dice to light up a random <b>wild cell</b> (yellow).</li>
                <li>
                  Play 2 cards per turn.
                </li>
              </ul>
            </li>
            <li>
              <b>Scoring:</b>
              <ul>
                <li>
                  <b>+1 point:</b> Replace any dot on the board (even your own or a wild) with your color.
                </li>
                <li>
                  <b>+N points:</b> For every dot cleared when you complete a row/chain of 3+ in any direction.
                </li>
                <li>Your score and color tallies are shown at the top.</li>
              </ul>
            </li>
            <li>
              <b>Chain Reactions:</b>
              <ul>
                <li>
                  If you create or clear a row of 3+ with your move, those dots are removed and you earn points for each dot cleared.
                </li>
                <li>
                  If a yellow wild dot is cleared or replaced, a new wild cell will be rolled.
                </li>
              </ul>
            </li>
            <li>
              <b>Winning:</b>
              <ul>
                <li>
                  <b>Easy Mode:</b> First to 20 points wins.
                </li>
                <li>
                  <b>Hard Mode:</b> Get 5 of each color (red, blue, green, purple) to win.
                </li>
              </ul>
            </li>
            <li>
              <b>Pro Tips:</b>
              <ul>
                <li>
                  Try to create chains to clear as many dots as possible in one move.
                </li>
                <li>
                  Watch for wild (yellow) dots—they help trigger chain reactions!
                </li>
              </ul>
            </li>
          </ol>
          <div
            style={{
              marginTop: 18,
              marginBottom: 4,
              fontSize: "0.97em",
              color: "#555",
              background: "#eef7ff",
              padding: "10px 12px",
              borderRadius: 10,
              textAlign: "center"
            }}
          >
            <b>Tip:</b> Click the <span style={{
              display: "inline-block",
              color: "#2b71e7",
              fontWeight: 700,
              fontSize: "1.04em",
              padding: "2px 4px"
            }}>Instructions</span> tab at any time for help!
          </div>
        </div>
        <button
          style={{
            marginTop: 18,
            background: "#2b71e7",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 32px",
            fontWeight: 700,
            fontSize: "1.13em",
            letterSpacing: "0.5px",
            boxShadow: "0 2px 8px #0003",
            cursor: "pointer",
            alignSelf: "center"
          }}
          onClick={onClose}
        >
          Got it!
        </button>
      </div>
    </div>
  );
}