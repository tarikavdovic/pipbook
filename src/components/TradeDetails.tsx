import type { Trade } from "@/types";
import { formatR } from "@/utils/format";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type TradeDetailsProps = {
  trade: Trade;
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function TradeDetails({ trade }: TradeDetailsProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      {trade.chartUrl ? (
        <Image source={{ uri: trade.chartUrl }} style={styles.image} />
      ) : null}

      <Text style={styles.title}>
        {trade.pair} · {trade.direction.toUpperCase()}
      </Text>
      <Text style={styles.result}>
        {formatR(trade.resultR)} · {trade.outcome}
      </Text>

      <View style={styles.card}>
        <Row label="Date" value={trade.date} />
        <Row label="Setup" value={trade.setup} />
        <Row label="Entry" value={String(trade.entry)} />
        <Row label="Stop loss" value={String(trade.stopLoss)} />
        <Row label="Take profit" value={String(trade.takeProfit)} />
      </View>

      {trade.notes ? (
        <View style={styles.card}>
          <Text style={styles.label}>Notes</Text>
          <Text>{trade.notes}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  image: { width: "100%", height: 220, borderRadius: 12 },
  title: { fontSize: 24, fontWeight: "bold" },
  result: { fontSize: 18, color: "#5B6475" },
  card: { padding: 12, borderRadius: 12, backgroundColor: "#E6EEF7", gap: 8 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  label: { color: "#5B6475" },
  value: { fontWeight: "600" },
});
