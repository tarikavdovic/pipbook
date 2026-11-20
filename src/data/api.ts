import type { Trade } from "@/types";
import { trades } from "./trades";

// Returns a promise that resolves after `ms` milliseconds.
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Pretends to load trades from a server: waits 800 ms, then returns the mock data.
// Pass { fail: true } to simulate a failed request (for testing the error state).
export async function fetchTrades(
  options: { fail?: boolean } = {}
): Promise<Trade[]> {
  await wait(800);

  if (options.fail) {
    throw new Error("Could not load trades");
  }

  return [...trades]; // a copy, so changes in the app never touch the mock data
}

// Finds one trade by its id. Returns undefined when no trade has that id.
// The id comes from the address, so it is always a string.
export function getTrade(id: string): Trade | undefined {
  return trades.find((trade) => trade.id === id);
}
