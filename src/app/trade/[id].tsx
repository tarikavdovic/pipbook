import EmptyState from "@/components/EmptyState";
import TradeDetails from "@/components/TradeDetails";
import { FontSize, Radius, Spacing } from "@/constants/theme";
import { getTrade } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function TradeScreen() {
  const theme = useTheme();
  const router = useRouter();
  // The [id] part of the address, e.g. "/trade/3" gives id = "3".
  const { id } = useLocalSearchParams<{ id: string }>();
  const trade = getTrade(id);

  // Opened from the list: go back. Opened directly by address (no screen
  // behind it): replace this screen with the list.
  function goBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }

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
    <>
      {/* Sets the header title from the data, e.g. "EUR/USD · BUY" */}
      <Stack.Screen
        options={{ title: `${trade.pair} · ${trade.direction.toUpperCase()}` }}
      />
      <TradeDetails trade={trade}>
        <Pressable
          onPress={goBack}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.primary },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.buttonText, { color: theme.onPrimary }]}>
            Back to the list
          </Text>
        </Pressable>
      </TradeDetails>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44, // big enough to tap easily
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.pill,
  },
  pressed: { opacity: 0.6 },
  buttonText: { fontSize: FontSize.body, fontWeight: "bold" },
});
