import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Trade } from "@/types";
import { formatDate, formatR, outcomeColor } from "@/utils/format";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TradeDetailsProps = {
  trade: Trade;
};

// One "label ........ value" line.
function Row({ label, value }: { label: string; value: string }) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
      <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
    </View>
  );
}

export default function TradeDetails({ trade }: TradeDetailsProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const cardColors = { backgroundColor: theme.card, borderColor: theme.border };

  // The three small boxes under the title.
  const boxes = [
    {
      label: "Result",
      value: formatR(trade.resultR),
      color: outcomeColor(trade.outcome, theme), // green, red or grey
    },
    { label: "Outcome", value: trade.outcome, color: theme.text },
    { label: "Date", value: formatDate(trade.date), color: theme.text },
  ];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        // Only the bottom gets the safe-area inset; the header covers the top.
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Full width on phones, max 600px and centred on wide screens. */}
      <View style={styles.inner}>
        {trade.chartUrl ? (
          <Image
            source={{ uri: trade.chartUrl }}
            // border colour shows as a placeholder while the photo loads
            style={[styles.image, { backgroundColor: theme.border }]}
          />
        ) : null}

        <Text style={[styles.title, { color: theme.text }]}>
          {trade.pair} · {trade.direction.toUpperCase()}
        </Text>

        <View style={styles.boxes}>
          {boxes.map((box) => (
            <View key={box.label} style={[styles.box, cardColors]}>
              <Text style={[styles.boxValue, { color: box.color }]}>
                {box.value}
              </Text>
              <Text style={[styles.boxLabel, { color: theme.muted }]}>
                {box.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.card, cardColors]}>
          <Row label="Entry" value={String(trade.entry)} />
          <Row label="Stop loss" value={String(trade.stopLoss)} />
          <Row label="Take profit" value={String(trade.takeProfit)} />
          <Row label="Setup" value={trade.setup} />
        </View>

        <View style={[styles.card, cardColors]}>
          <Text style={[styles.label, { color: theme.muted }]}>Notes</Text>
          {/* Notes are optional, so show a short message when there are none. */}
          <Text
            style={[styles.notes, { color: trade.notes ? theme.text : theme.muted }]}
          >
            {trade.notes || "No notes for this trade."}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.md },
  inner: { width: "100%", maxWidth: 600, alignSelf: "center", gap: Spacing.md },
  image: { width: "100%", aspectRatio: 16 / 9, borderRadius: Radius.md },
  title: { fontSize: FontSize.hero, fontWeight: "bold" },
  boxes: { flexDirection: "row", gap: Spacing.sm },
  box: {
    flex: 1, // all three boxes get the same width
    alignItems: "center",
    gap: Spacing.xs,
    padding: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  boxValue: {
    fontSize: FontSize.body,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize", // "win" -> "Win"
  },
  boxLabel: { fontSize: FontSize.small },
  card: {
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between", // label left, value right
    gap: Spacing.md,
  },
  label: { fontSize: FontSize.body },
  // flexShrink lets a long value wrap instead of pushing out of the card
  value: {
    flexShrink: 1,
    textAlign: "right",
    fontSize: FontSize.body,
    fontWeight: "600",
  },
  notes: { fontSize: FontSize.body },
});
