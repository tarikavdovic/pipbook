import { FontSize, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, Text, View } from "react-native";

type EmptyStateProps = {
  title: string;
  message: string;
};

// Shown in the middle of the screen when there is nothing to list.
export default function EmptyState({ title, message }: EmptyStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.message, { color: theme.muted }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // take all free space so the text can be centred in it
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
    padding: Spacing.lg,
  },
  title: { fontSize: FontSize.title, fontWeight: "bold", textAlign: "center" },
  message: { fontSize: FontSize.body, textAlign: "center" },
});
