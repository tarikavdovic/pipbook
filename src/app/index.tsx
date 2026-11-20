import EmptyState from "@/components/EmptyState";
import FilterChip from "@/components/FilterChip";
import SummaryRow from "@/components/SummaryRow";
import TradeCard from "@/components/TradeCard";
import { FontSize, Radius, Spacing } from "@/constants/theme";
import { fetchTrades } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";
import type { Outcome, Trade } from "@/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Status = "loading" | "error" | "ready";
type Filter = "all" | Outcome;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "win", label: "Win" },
  { value: "loss", label: "Loss" },
  { value: "breakeven", label: "Breakeven" },
];

type Sort = "newest" | "best";

const SORTS: { value: Sort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "best", label: "Best R" },
];

// Word used in the empty message, e.g. "No losing trades".
const FILTER_WORDS: Record<Outcome, string> = {
  win: "winning",
  loss: "losing",
  breakeven: "breakeven",
};

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter(); // used to open the details screen
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions(); // updates when the window is resized

  const [trades, setTrades] = useState<Trade[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0); // +1 = load again
  // Separate from status, so the old cards stay visible while refreshing.
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("newest");

  // Calculated during render from trades + filter, so it is never out of date.
  const visible =
    filter === "all" ? trades : trades.filter((t) => t.outcome === filter);

  // sort() changes the array it is called on, so we sort a copy, never the state.
  const sorted = [...visible].sort((a, b) =>
    sort === "newest"
      ? b.date.localeCompare(a.date) // "YYYY-MM-DD" strings sort like dates
      : b.resultR - a.resultR // highest R first
  );

  // Load the trades on first render, and again every time `attempt` changes.
  useEffect(() => {
    // If the screen closes (or we retry) before loading ends, ignore the old result.
    let ignore = false;

    fetchTrades()
      .then((data) => {
        if (!ignore) {
          setTrades(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!ignore) setStatus("error");
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setStatus("loading");
    setAttempt((a) => a + 1);
  }

  // Asks first, then removes the trade from state (SummaryRow updates too).
  function confirmDelete(trade: Trade) {
    Alert.alert(
      "Delete trade?",
      `"${trade.pair} ${trade.direction.toUpperCase()} on ${trade.date}" will be removed.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          // filter returns a new array without this trade
          onPress: () => setTrades((list) => list.filter((t) => t.id !== trade.id)),
        },
      ]
    );
  }

  // Called when the user pulls the list down.
  async function refresh() {
    setRefreshing(true);
    try {
      const data = await fetchTrades();
      setTrades(data);
    } catch {
      // Refresh failed: keep showing the trades we already have.
    } finally {
      setRefreshing(false); // runs after success and after an error
    }
  }

  // Phone: 1 column, small tablet: 2, wide screen: 3.
  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  // Screen width minus the padding on both sides and the gaps between cards.
  // Math.floor rounds down so the cards never end up a fraction too wide to fit.
  const cardWidth = Math.floor(
    (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns
  );

  if (status === "loading") {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (status === "error") {
    return (
      <View style={styles.center}>
        <Text style={[styles.errorText, { color: theme.text }]}>
          Could not load trades.
        </Text>
        <Pressable
          onPress={retry}
          accessibilityRole="button"
          style={[styles.button, { backgroundColor: theme.primary }]}
        >
          <Text style={[styles.buttonText, { color: theme.onPrimary }]}>
            Try again
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      // FlatList cannot change numColumns on the fly, so a new key
      // makes React build a fresh list when the column count changes.
      key={columns}
      numColumns={columns}
      // The row style only exists when there is more than one column.
      columnWrapperStyle={columns > 1 ? styles.row : undefined}
      data={sorted}
      keyExtractor={(trade) => trade.id}
      // Pull down to reload; FlatList shows the spinner while refreshing is true.
      refreshing={refreshing}
      onRefresh={refresh}
      renderItem={({ item }) => (
        <TradeCard
          trade={item}
          style={{ width: cardWidth }}
          // Opens the details screen, e.g. /trade/3
          onPress={() => router.push(`/trade/${item.id}`)}
          onLongPress={() => confirmDelete(item)}
        />
      )}
      // Scrolls together with the list, above the first card.
      ListHeaderComponent={
        <View style={styles.headerContent}>
          {/* The summary always counts all trades, not only the filtered ones. */}
          <SummaryRow trades={trades} />
          <View style={styles.chips}>
            {FILTERS.map((f) => (
              <FilterChip
                key={f.value}
                label={f.label}
                selected={filter === f.value}
                onPress={() => setFilter(f.value)}
              />
            ))}
          </View>
          <View style={styles.chips}>
            {SORTS.map((s) => (
              <FilterChip
                key={s.value}
                label={s.label}
                selected={sort === s.value}
                onPress={() => setSort(s.value)}
              />
            ))}
          </View>
        </View>
      }
      ListHeaderComponentStyle={styles.header}
      // Space between two rows (not before the first or after the last).
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        filter === "all" ? (
          <EmptyState
            title="No trades yet"
            message="Your trades will appear here."
          />
        ) : (
          <EmptyState
            title={`No ${FILTER_WORDS[filter]} trades`}
            message="Choose another filter."
          />
        )
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
  headerContent: { gap: Spacing.md },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.sm },
  separator: { height: Spacing.md },
  row: { gap: Spacing.md }, // space between cards in the same row
  // Used for the loading spinner and the error message.
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  errorText: { fontSize: FontSize.body, textAlign: "center" },
  button: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
  },
  buttonText: { fontSize: FontSize.body, fontWeight: "bold" },
});
