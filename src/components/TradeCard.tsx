import type { Trade } from "@/types";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type TradeCardProps = {
  trade: Trade;
};

function formatR(r: number) {
  return r > 0 ? `+${r}R` : `${r}R`;
}

export default function TradeCard({ trade }: TradeCardProps) {
  return (
    <Pressable
      onPress={() => console.log("Open", trade.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {trade.chartUrl ? (
        <Image source={{ uri: trade.chartUrl }} style={styles.image} />
      ) : null}

      <View style={styles.content}>
        <Text style={styles.title}>
          {trade.pair} · {trade.direction.toUpperCase()}
        </Text>
        <Text style={styles.details}>
          {trade.date} · {trade.setup} · {formatR(trade.resultR)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, overflow: "hidden", backgroundColor: "#E6EEF7" },
  pressed: { opacity: 0.6 },
  image: { width: "100%", height: 160 },
  content: { padding: 12, gap: 4 },
  title: { fontSize: 18, fontWeight: "bold" },
  details: { color: "#5B6475" },
});
