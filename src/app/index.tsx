import SummaryRow from "@/components/SummaryRow";
import TradeCard from "@/components/TradeCard";
import { Spacing } from "@/constants/theme";
import { trades } from "@/data/trades";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      data={trades}
      keyExtractor={(trade) => trade.id}
      renderItem={({ item }) => <TradeCard trade={item} />}
      // Scrolls together with the list, above the first card.
      ListHeaderComponent={<SummaryRow trades={trades} />}
      ListHeaderComponentStyle={styles.header}
      // Space between two cards (not before the first or after the last).
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={[
        styles.container,
        // extra space so the last card is not hidden behind the bottom system bar
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
      contentInsetAdjustmentBehavior="automatic"
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.md },
  header: { marginBottom: Spacing.md },
  separator: { height: Spacing.md },
});
