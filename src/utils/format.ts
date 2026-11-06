import type { Theme } from "@/constants/theme";
import type { Outcome } from "@/types";

// 2 -> "+2R", -1 -> "-1R", 0 -> "0R"
export function formatR(r: number) {
  return r > 0 ? `+${r}R` : `${r}R`;
}

// Picks the theme colour that matches the trade outcome.
export function outcomeColor(outcome: Outcome, theme: Theme) {
  return theme[outcome]; // "win" | "loss" | "breakeven" are keys in the theme
}
