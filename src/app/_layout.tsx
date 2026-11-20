import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text } from "react-native";
import { FontSize, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export default function RootLayout() {
  const theme = useTheme();

  return (
    <>
      {/* "auto" = dark icons in light mode, light icons in dark mode */}
      <StatusBar style="auto" />
      <Stack
        // These options apply to every screen in the stack.
        screenOptions={{
          headerStyle: { backgroundColor: theme.card },
          headerTintColor: theme.text, // title and back button colour
          headerShadowVisible: false, // no line under the header
          headerBackButtonDisplayMode: "minimal", // back arrow only, no text
          // Screen background, so there is no white flash in dark mode.
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        {/* Each name is the file path inside src/app, without .tsx */}
        <Stack.Screen
          name="index"
          options={{
            title: "My trades",
            headerRight: () => (
              // asChild: Link passes its navigation to the Pressable inside it.
              <Link href="/about" asChild>
                <Pressable
                  // makes the touch area bigger than the text
                  hitSlop={Spacing.sm}
                  accessibilityRole="link"
                >
                  <Text style={[styles.headerLink, { color: theme.primary }]}>
                    About
                  </Text>
                </Pressable>
              </Link>
            ),
          }}
        />
        <Stack.Screen name="about" options={{ title: "About" }} />
        {/* The real title is set inside the screen once the trade is loaded. */}
        <Stack.Screen name="trade/[id]" options={{ title: "" }} />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  headerLink: { fontSize: FontSize.body, fontWeight: "600" },
});
