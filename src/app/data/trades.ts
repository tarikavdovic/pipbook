import type { Trade } from "@/types";

export const trades: Trade[] = [
  {
    id: "1",
    pair: "EUR/USD",
    direction: "buy",
    date: "2026-10-28",
    entry: 1.085,
    stopLoss: 1.082,
    takeProfit: 1.091,
    resultR: 2,
    outcome: "win",
    setup: "London breakout",
    notes: "Waited for the retest, followed the plan.",
    chartUrl: "https://picsum.photos/seed/eurusd/600/400",
  },
];
