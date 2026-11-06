import SummaryRow from "@/components/SummaryRow";
import TradeCard from "@/components/TradeCard";
import { Spacing } from "@/constants/theme";
import { trades } from "@/data/trades";
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
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
    <ScrollView
      contentContainerStyle={[
        styles.container,
        // extra space so the last card is not hidden behind the bottom system bar
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
      contentInsetAdjustmentBehavior="automatic"
    >
      <SummaryRow trades={trades} />

      <View style={styles.grid}>
        {trades.map((trade) => (
          <TradeCard key={trade.id} trade={trade} style={{ width: cardWidth }} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.md, gap: Spacing.md },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.md },
});
