import EmptyState from "@/components/EmptyState";
import SummaryRow from "@/components/SummaryRow";
import TradeCard from "@/components/TradeCard";
import { Spacing } from "@/constants/theme";
import { trades } from "@/data/trades";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions(); // updates when the window is resized

  // Phone: 1 column, small tablet: 2, wide screen: 3.
  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  // Screen width minus the padding on both sides and the gaps between cards.
  // Math.floor rounds down so the cards never end up a fraction too wide to fit.
  const cardWidth = Math.floor(
    (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns
  );

  return (
    <FlatList
      // FlatList cannot change numColumns on the fly, so a new key
      // makes React build a fresh list when the column count changes.
      key={columns}
      numColumns={columns}
      // The row style only exists when there is more than one column.
      columnWrapperStyle={columns > 1 ? styles.row : undefined}
      data={trades}
      keyExtractor={(trade) => trade.id}
      renderItem={({ item }) => (
        <TradeCard trade={item} style={{ width: cardWidth }} />
      )}
      // Scrolls together with the list, above the first card.
      ListHeaderComponent={<SummaryRow trades={trades} />}
      ListHeaderComponentStyle={styles.header}
      // Space between two rows (not before the first or after the last).
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <EmptyState
          title="No trades yet"
          message="Your trades will appear here."
        />
      }
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
  // flexGrow lets the content fill the screen, so the empty state can be centred
  container: { flexGrow: 1, padding: Spacing.md },
  header: { marginBottom: Spacing.md },
  separator: { height: Spacing.md },
  row: { gap: Spacing.md }, // space between cards in the same row
});
