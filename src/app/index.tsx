import TradeCard from "@/components/TradeCard";
import { FontSize, Spacing } from "@/constants/theme";
import { trades } from "@/data/trades";
import { useTheme } from "@/hooks/use-theme";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const theme = useTheme();
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
      <Text style={[styles.count, { color: theme.muted }]}>
        {trades.length} trades
      </Text>

      {trades.map((trade) => (
        <TradeCard key={trade.id} trade={trade} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.md, gap: Spacing.md },
  count: { fontSize: FontSize.small },
});
