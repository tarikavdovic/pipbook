import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/hooks/use-theme";

export default function RootLayout() {
  const theme = useTheme();

  return (
    <>
      {/* "auto" = dark icons in light mode, light icons in dark mode */}
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.card },
          headerTintColor: theme.text, // title and back button colour
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: "My trades" }} />
      </Stack>
    </>
  );
}
