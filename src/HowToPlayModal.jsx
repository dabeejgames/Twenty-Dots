import React from "react";

export default function HowToPlayModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="how-to-play-modal-overlay" style={{
      position: "fixed", top:0, left:0, width:"100vw", height:"100vh",
      background:"rgba(30,40,70,0.65)", zIndex: 5000, display:"flex", alignItems:"center", justifyContent:"center"
    }} onClick={onClose}>
      <div className="how-to-play-modal-content" style={{
        background:"#fff", borderRadius:16, maxWidth:420, width:"93vw", padding:"32px 22px", boxShadow:"0 8px 28px #0005", position:"relative"
      }} onClick={e=>e.stopPropagation()}>
        <h2 style={{marginTop:0}}>How to Play <span role="img" aria-label="dots">🔵</span></h2>
        <ol style={{paddingLeft:18, fontSize:"1.08em"}}>
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
              <li>Play cards matching the wild cell’s row and column.<br />
              (You can play up to 2 cards per turn; each must be to the current wild cell.)</li>
            </ul>
          </li>
          <li>
            <b>Scoring:</b>
            <ul>
              <li><b>+1 point:</b> Replace an opponent’s colored dot with your color.</li>
              <li><b>+1 point:</b> Replace a yellow wild dot with your color.</li>
              <li><b>+1 point:</b> For each opponent’s dot cleared when you make a row of 3 or more in any direction (horizontal, vertical, or diagonal).</li>
              <li><b>+N points:</b> N = number of dots cleared if you complete a row/chain of 3+ in a line. You also get +1 for each of those dots in your color’s tally.</li>
              <li>Your score and color tallies are shown at the top.</li>
            </ul>
          </li>
          <li>
            <b>Chain Reactions:</b>
            <ul>
              <li>If you create or clear a row of 3+ with your move, those dots are removed and you earn points for each dot cleared.</li>
              <li>If a yellow wild dot is cleared or replaced, a new wild cell will be rolled.</li>
            </ul>
          </li>
          <li>
            <b>Winning:</b>
            <ul>
              <li><b>Easy Mode:</b> First to 20 points wins.</li>
              <li><b>Hard Mode:</b> Get 5 of each color (red, blue, green, purple) to win.</li>
            </ul>
          </li>
          <li>
            <b>Pro Tips:</b>
            <ul>
              <li>Try to create chains to clear as many dots as possible in one move.</li>
              <li>Watch for wild (yellow) dots—they help trigger chain reactions!</li>
            </ul>
          </li>
        </ol>
        <button
          style={{
            marginTop: 24,
            background: "#2b71e7",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 28px",
            fontWeight: 700,
            fontSize: "1.1em",
            letterSpacing: "0.5px",
            boxShadow: "0 2px 8px #0003",
            cursor: "pointer"
          }}
          onClick={onClose}
        >Got it!</button>
      </div>
    </div>
  );
}