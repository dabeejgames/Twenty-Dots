import React from "react";

// This will use GameCard if passed as prop, else fallback to a basic Card
function DefaultCard({ card, width, height, fontSize, onClick, isActive, disabled }) {
  if (!card) return (
    <div style={{
      width, height,
      background: "#f7f7f7",
      border: "2px dashed #ddd",
      borderRadius: 9,
      display: "inline-block"
    }} />
  );
  const colorMap = {
    red: "#e74c3c",
    blue: "#3498db",
    green: "#2ecc71",
    purple: "#a259d9",
    yellow: "#f7e34e"
  };
  return (
    <div
      onClick={!disabled && isActive && onClick ? onClick : undefined}
      style={{
        width,
        height,
        background: colorMap[card.color] || "#eee",
        color: "#fff",
        borderRadius: 9,
        fontWeight: 700,
        fontSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textShadow: "1px 2px 5px #0002",
        marginRight: 3,
        marginLeft: 2,
        boxShadow: "0 1px 6px #0001",
        cursor: !disabled && isActive && onClick ? "pointer" : "default",
        opacity: disabled ? 0.6 : 1
      }}
    >
      {card.row && card.col
        ? `${card.row}${card.col}`
        : card.color === "yellow" ? "?" : ""}
    </div>
  );
}

export default function PlayerArea({
  player,
  isActive,
  onCardClick,
  showHand,
  discardPiles,
  isAI,
  mode,
  cardFontSize = "1.1em",
  cardWidth = 68,
  cardHeight = 75,
  GameCard, // upgraded card component (from App)
  style = {},
}) {
  const Card = GameCard || DefaultCard;

  return (
    <div
      className={`player-area ${isAI ? "player-ai" : "player-human"}`}
      style={{
        background: "#fff",
        borderRadius: 13,
        boxShadow: "0 2px 11px #0001",
        padding: "8px 5px 13px 5px",
        margin: "0 auto",
        width: "100%",
        maxWidth: 195,
        minHeight: 100,
        textAlign: "center",
        ...style
      }}
    >
      <div style={{
        fontWeight: 700,
        fontSize: "1.07em",
        marginBottom: 2,
        color: isAI ? "#777" : "#2b71e7",
        letterSpacing: "1.5px"
      }}>
        {player.name}
      </div>
     {showHand && (
  <div
    className="player-hand"
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: 7,
      marginBottom: 0,
      marginTop: 2
    }}
  >
    {player.hand.map((card, idx) => (
      <span
        key={idx}
        style={{ display: "inline-block" }}
        onClick={isActive && onCardClick ? () => onCardClick(idx) : undefined}
        tabIndex={isActive && onCardClick ? 0 : -1}
        role={isActive && onCardClick ? "button" : undefined}
        aria-disabled={!isActive}
      >
        <DefaultCard
          card={card}
          width={cardWidth}
          height={cardHeight}
          fontSize={cardFontSize}
          isActive={isActive}
          disabled={!isActive}
        />
      </span>
    ))}
  </div>
)}
      <div
        className="player-discards"
        style={{
          marginTop: showHand ? 8 : 0,
          marginBottom: 7,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 6
        }}
      >
        {discardPiles && discardPiles.length > 0
          ? discardPiles.map((card, idx) => (
            <Card
              card={card}
              width={cardWidth - 14}
              height={cardHeight - 14}
              fontSize={"0.92em"}
              key={idx}
              disabled={true}
            />
          ))
          : <>
            <Card width={cardWidth - 14} height={cardHeight - 14} fontSize={"0.92em"} disabled={true} />
            <Card width={cardWidth - 14} height={cardHeight - 14} fontSize={"0.92em"} disabled={true} />
          </>
        }
      </div>
      <div style={{
        fontSize: "1.02em",
        color: "#888",
        fontWeight: 600,
        letterSpacing: "0.5px"
      }}>
        Score: <span style={{ color: "#2b71e7", fontWeight: 800 }}>{player.score}</span>
        {mode === "hard" && (
          <span style={{ display: "block", marginTop: 2, fontSize: "0.99em" }}>
            <span style={{ color: "#e74c3c", fontWeight: 700, marginRight: 3 }}>{player.red}</span>
            <span style={{ color: "#3498db", fontWeight: 700, marginRight: 3 }}>{player.blue}</span>
            <span style={{ color: "#2ecc71", fontWeight: 700, marginRight: 3 }}>{player.green}</span>
            <span style={{ color: "#a259d9", fontWeight: 700 }}>{player.purple}</span>
          </span>
        )}
      </div>
    </div>
  );
}