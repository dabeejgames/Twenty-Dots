import React, { createContext, useContext } from "react";

const MultiplayerContext = createContext();

export function useMultiplayer() {
  return useContext(MultiplayerContext);
}

export default MultiplayerContext;