import TradeCard from "@/components/TradeCard";
import { trades } from "@/data/trades";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.count}>{trades.length} trades</Text>

      {trades.map((trade) => (
        <TradeCard key={trade.id} trade={trade} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  count: { color: "#5B6475" },
});
