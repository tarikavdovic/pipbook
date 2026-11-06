import SummaryRow from "@/components/SummaryRow";
import TradeCard from "@/components/TradeCard";
import { Spacing } from "@/constants/theme";
import { trades } from "@/data/trades";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

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

      {trades.map((trade) => (
        <TradeCard key={trade.id} trade={trade} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.md, gap: Spacing.md },
});
