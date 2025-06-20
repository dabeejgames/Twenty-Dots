import React from "react";
import Card from "./Card";
import "./DiscardPiles.css";

export default function DiscardPiles({ cards }) {
  return (
    <div className="discard-piles">
      <div className="discard-pile">
        {cards[0] ? <Card {...cards[0]} /> : <div className="discard-placeholder" />}
      </div>
      <div className="discard-pile">
        {cards[1] ? <Card {...cards[1]} /> : <div className="discard-placeholder" />}
      </div>
    </div>
  );
}