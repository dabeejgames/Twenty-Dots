import React, { createContext, useContext } from "react";

// Create the context
const MultiplayerContext = createContext();

// Export the context and a hook for easy use
export function useMultiplayer() {
  return useContext(MultiplayerContext);
}

export default MultiplayerContext;