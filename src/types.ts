export type Direction = "buy" | "sell";
export type Outcome = "win" | "loss" | "breakeven";

export type Trade = {
  id: string;
  pair: string; // 'EUR/USD'
  direction: Direction;
  date: string; // '2026-10-28'
  entry: number;
  stopLoss: number;
  takeProfit: number;
  resultR: number; // +2, -1, 0
  outcome: Outcome;
  setup: string; // 'London breakout'
  notes?: string;
  chartUrl?: string;
};
