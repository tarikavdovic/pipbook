import EmptyState from "@/components/EmptyState";
import { FontSize, Spacing } from "@/constants/theme";
import { getTrade } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function TradeScreen() {
  const theme = useTheme();
  // The [id] part of the address, e.g. "/trade/3" gives id = "3".
  const { id } = useLocalSearchParams<{ id: string }>();
  const trade = getTrade(id);

  // Wrong id (e.g. /trade/99): show a friendly message instead of crashing.
  if (!trade) {
    return (
      <EmptyState
        title="Trade not found"
        message="This trade does not exist or was deleted."
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.text }]}>
        Details of trade {trade.id}: {trade.pair}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.lg,
  },
  text: { fontSize: FontSize.body },
});
