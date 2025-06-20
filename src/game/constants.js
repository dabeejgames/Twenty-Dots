// Board Rows and Columns
export const BOARD_ROWS = ["A", "B", "C", "D", "E", "F"];
export const BOARD_COLS = [1, 2, 3, 4, 5, 6];

// Generate all board locations, e.g., A1, A2, ..., F6
export const BOARD_LOCATIONS = BOARD_ROWS.flatMap(row =>
  BOARD_COLS.map(col => ({ id: `${row}${col}` }))
);

// Dot colors (including yellow for wilds)
export const DOT_COLORS = ["red", "blue", "purple", "green", "yellow"];
export const PLAYER_COLORS = ["red", "blue", "purple", "green"]; // Only for player cards

// Generate the full deck: 36 cards per color (red, blue, purple, green), no yellow cards
export function generateDeck() {
  const cards = [];
  for (const color of PLAYER_COLORS) {
    for (const row of BOARD_ROWS) {
      for (const col of BOARD_COLS) {
        cards.push({
          color,
          row,
          col,
          id: `${color}-${row}${col}`,
        });
      }
    }
  }
  return cards;
}

// Utility: get cell label (for display)
export function getCellLabel(cellId) {
  // cellId is like "A1"
  const row = cellId[0];
  const col = cellId.slice(1);
  return `${row}${col}`;
}

// Utility: get display name for a color
export function getColorDisplayName(color) {
  if (color === "purple") return "Purple";
  if (color === "red") return "Red";
  if (color === "blue") return "Blue";
  if (color === "green") return "Green";
  if (color === "yellow") return "Wild";
  return color;
}

// Dice possible values
export const DICE_ROWS = [...BOARD_ROWS]; // ["A", "B", "C", "D", "E", "F"]
export const DICE_COLS = [...BOARD_COLS]; // [1, 2, 3, 4, 5, 6]