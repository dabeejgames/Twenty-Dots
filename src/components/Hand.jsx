import React from "react";
import Card from "./Card";

export default function Hand({ cards, onCardClick }) {
  return (
    <div
      className="hand"
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
      {cards.map((card, idx) => (
        <Card
          key={card.id}
          {...card}
          onClick={() => onCardClick && onCardClick(idx)}
        />
      ))}
    </div>
  );
}