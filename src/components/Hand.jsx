import React from "react";
import Card from "./Card";
export default function Hand({ cards, onCardClick }) {
  return (
    <div className="hand">
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