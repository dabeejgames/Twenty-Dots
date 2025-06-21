import React from "react";
import "./Card.css"; // Make sure to create/import this CSS file for modern card styles

// Modern Card component
function ModernCard({ card, width, height, fontSize, isActive, disabled }) {
  if (!card) return (
    <div
      className="player-card-modern"
      style={{
        width,
        height,
        opacity: 0.35,
        background: "#f7f7f7",
        border: "2px dashed #ddd",
        color: "#bbb",
        display: "inline-block"
      }}
    />
  );

  // Card color class (matches Card.css)
  const colorClass = card.color ? ` ${card.color}` : "";
  return (
    <div
      className={`player-card-modern${colorClass}`}
      style={{
        width,
        height,
        fontSize,
        opacity: disabled ? 0.65 : 1,
        cursor: disabled ? "default" : "pointer",
        boxShadow: isActive && !disabled ? "0 2px 10px #3498db33" : undefined,
        transition: "box-shadow 0.18s, transform 0.13s",
        margin: "0 5px"
      }}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      {card.row}{card.col}
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
  style = {},
}) {
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
        // REMOVE maxWidth restriction for mobile friendliness
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
            justifyContent: "flex-start",
            gap: 7,
            marginBottom: 0,
            marginTop: 2,
            overflowX: "auto",
            maxWidth: "100vw",
            padding: "0 5px",
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
              <ModernCard
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
            <ModernCard
              card={card}
              width={cardWidth - 14}
              height={cardHeight - 14}
              fontSize={"0.92em"}
              key={idx}
              disabled={true}
            />
          ))
          : <>
            <ModernCard width={cardWidth - 14} height={cardHeight - 14} fontSize={"0.92em"} disabled={true} />
            <ModernCard width={cardWidth - 14} height={cardHeight - 14} fontSize={"0.92em"} disabled={true} />
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