import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Trade } from "@/types";
import { formatR, outcomeColor } from "@/utils/format";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type TradeCardProps = {
  trade: Trade;
};

export default function TradeCard({ trade }: TradeCardProps) {
  const theme = useTheme();

  // The result badge, e.g. "+2R", coloured by outcome.
  const badge = (
    <View
      style={[
        styles.badge,
        { backgroundColor: outcomeColor(trade.outcome, theme) },
      ]}
    >
      <Text style={[styles.badgeText, { color: theme.onPrimary }]}>
        {formatR(trade.resultR)}
      </Text>
    </View>
  );

  return (
    <Pressable
      onPress={() => console.log("Open", trade.id)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        pressed && styles.pressed,
      ]}
    >
      {trade.chartUrl ? (
        // Image and badge share this parent, so the badge sits on top of the photo.
        <View>
          <Image source={{ uri: trade.chartUrl }} style={styles.image} />
          <View style={styles.badgeOverlay}>{badge}</View>
        </View>
      ) : null}

      <View style={styles.content}>
        <View style={styles.texts}>
          <Text style={[styles.title, { color: theme.text }]}>
            {trade.pair} · {trade.direction.toUpperCase()}
          </Text>
          <Text style={[styles.details, { color: theme.muted }]}>
            {trade.date} · {trade.setup}
          </Text>
        </View>

        {/* No photo: show the badge here instead. */}
        {trade.chartUrl ? null : badge}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: Radius.md, borderWidth: 1, overflow: "hidden" },
  pressed: { opacity: 0.6 },
  image: { width: "100%", aspectRatio: 16 / 9 },
  badgeOverlay: { position: "absolute", top: Spacing.sm, right: Spacing.sm },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
  },
  badgeText: { fontSize: FontSize.small, fontWeight: "bold" },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    padding: Spacing.md,
  },
  texts: { flex: 1, gap: Spacing.xs },
  title: { fontSize: FontSize.title, fontWeight: "bold" },
  details: { fontSize: FontSize.small },
});
