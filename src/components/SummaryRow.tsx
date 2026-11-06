import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Trade } from "@/types";
import { formatR } from "@/utils/format";
import { StyleSheet, Text, View } from "react-native";

type SummaryRowProps = {
  trades: Trade[];
};

export default function SummaryRow({ trades }: SummaryRowProps) {
  const theme = useTheme();

  // Calculated on every render from the trades, so it is never out of date.
  const total = trades.length;
  const wins = trades.filter((t) => t.outcome === "win").length;
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0; // avoid dividing by 0
  const totalR = trades.reduce((sum, t) => sum + t.resultR, 0);

  const boxes = [
    { label: "Trades", value: String(total) },
    { label: "Win rate", value: `${winRate}%` },
    { label: "Total", value: formatR(totalR) },
  ];

  return (
    <View style={styles.row}>
      {boxes.map((box) => (
        <View
          key={box.label}
          style={[
            styles.box,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.value, { color: theme.text }]}>{box.value}</Text>
          <Text style={[styles.label, { color: theme.muted }]}>{box.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: Spacing.sm },
  box: {
    flex: 1, // all three boxes get the same width
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  value: { fontSize: FontSize.title, fontWeight: "bold" },
  label: { fontSize: FontSize.small },
});
