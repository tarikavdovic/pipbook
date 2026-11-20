import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Link, Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Expo Router shows this screen for any address that has no route, e.g. /abc.
export default function NotFoundScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: "Not found" }} />

      <Text style={[styles.title, { color: theme.text }]}>Page not found</Text>
      <Text style={[styles.message, { color: theme.muted }]}>
        This page does not exist.
      </Text>

      {/* replace: the wrong address is removed, so Back does not return to it. */}
      <Link href="/" replace asChild>
        <Pressable
          accessibilityRole="link"
          style={[styles.button, { backgroundColor: theme.primary }]}
        >
          <Text style={[styles.buttonText, { color: theme.onPrimary }]}>
            Go to my trades
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    padding: Spacing.lg,
  },
  title: { fontSize: FontSize.title, fontWeight: "bold", textAlign: "center" },
  message: { fontSize: FontSize.body, textAlign: "center" },
  button: {
    minHeight: 44, // big enough to tap easily
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.pill,
  },
  buttonText: { fontSize: FontSize.body, fontWeight: "bold" },
});
