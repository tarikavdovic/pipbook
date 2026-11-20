import type { Theme } from "@/constants/theme";
import type { Outcome } from "@/types";

// 2 -> "+2R", -1 -> "-1R", 0 -> "0R"
export function formatR(r: number) {
  return r > 0 ? `+${r}R` : `${r}R`;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// "2026-10-28" -> "28 Oct 2026"
// We split the text ourselves instead of using new Date(), which can
// move the date one day back or forward depending on the time zone.
export function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

// Picks the theme colour that matches the trade outcome.
export function outcomeColor(outcome: Outcome, theme: Theme) {
  return theme[outcome]; // "win" | "loss" | "breakeven" are keys in the theme
}
