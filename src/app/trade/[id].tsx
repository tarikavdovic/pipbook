import EmptyState from "@/components/EmptyState";
import TradeDetails from "@/components/TradeDetails";
import { getTrade } from "@/data/api";
import { Stack, useLocalSearchParams } from "expo-router";

export default function TradeScreen() {
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
    <>
      {/* Sets the header title from the data, e.g. "EUR/USD · BUY" */}
      <Stack.Screen
        options={{ title: `${trade.pair} · ${trade.direction.toUpperCase()}` }}
      />
      <TradeDetails trade={trade} />
    </>
  );
}
