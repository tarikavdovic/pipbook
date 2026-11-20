import { FontSize, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// What you can do in the app, shown as a simple list.
const FEATURES = [
  "Log your trades with pair, direction, entry, stop loss and take profit",
  "See the result of each trade in R and the outcome",
  "Filter and sort your trades",
  "Open a trade to see all its details, notes and chart",
];

export default function AboutScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        // space so the last line is not hidden behind the bottom system bar
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Full width on phones, max 600px and centred on wide screens. */}
      <View style={styles.inner}>
        <Text style={[styles.title, { color: theme.text }]}>Pipbook</Text>

        <Text style={[styles.text, { color: theme.text }]}>
          Pipbook is a personal journal for forex traders. You log your own
          trades and review them later, so you can learn from your decisions
          and see which setups work for you and which do not.
        </Text>

        <Text style={[styles.heading, { color: theme.text }]}>
          What you can do
        </Text>
        {FEATURES.map((feature) => (
          <Text key={feature} style={[styles.text, { color: theme.text }]}>
            • {feature}
          </Text>
        ))}

        <Text style={[styles.note, { color: theme.muted }]}>
          Pipbook is a student project for the course Cross-Platform
          Development at the International Burch University (IBU).
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.md },
  inner: { width: "100%", maxWidth: 600, alignSelf: "center", gap: Spacing.sm },
  title: { fontSize: FontSize.hero, fontWeight: "bold" },
  heading: {
    fontSize: FontSize.title,
    fontWeight: "bold",
    marginTop: Spacing.md,
  },
  text: { fontSize: FontSize.body, lineHeight: 24 },
  note: { fontSize: FontSize.small, marginTop: Spacing.md },
});
