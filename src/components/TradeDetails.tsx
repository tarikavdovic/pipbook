import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Trade } from "@/types";
import { formatR, outcomeColor } from "@/utils/format";
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

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Full width on phones, max 600px and centred on wide screens. */}
      <View style={styles.inner}>
        {trade.chartUrl ? (
          <Image source={{ uri: trade.chartUrl }} style={styles.image} />
        ) : null}

        <Text style={[styles.title, { color: theme.text }]}>
          {trade.pair} · {trade.direction.toUpperCase()}
        </Text>
        <Text
          style={[styles.result, { color: outcomeColor(trade.outcome, theme) }]}
        >
          {formatR(trade.resultR)} · {trade.outcome}
        </Text>

        <View style={[styles.card, cardColors]}>
          <Row label="Date" value={trade.date} />
          <Row label="Setup" value={trade.setup} />
          <Row label="Entry" value={String(trade.entry)} />
          <Row label="Stop loss" value={String(trade.stopLoss)} />
          <Row label="Take profit" value={String(trade.takeProfit)} />
        </View>

        {/* Notes are optional, so only show the box when there are some. */}
        {trade.notes ? (
          <View style={[styles.card, cardColors]}>
            <Text style={[styles.label, { color: theme.muted }]}>Notes</Text>
            <Text style={[styles.notes, { color: theme.text }]}>
              {trade.notes}
            </Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.md },
  inner: { width: "100%", maxWidth: 600, alignSelf: "center", gap: Spacing.md },
  image: { width: "100%", aspectRatio: 16 / 9, borderRadius: Radius.md },
  title: { fontSize: FontSize.hero, fontWeight: "bold" },
  result: { fontSize: FontSize.title, fontWeight: "bold" },
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
