import { semanticColors } from "@/constants/theme";
import {
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";
import { useFonts } from "@expo-google-fonts/lato/useFonts";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, useColorScheme } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  const colorScheme = useColorScheme() ?? "light";
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const queryClient = new QueryClient();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
    <SafeAreaProvider>
      <ThemeProvider value={theme}>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="[transactionId]" />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
    </QueryClientProvider>

  );
}


const styles = StyleSheet.create({
  body: {
    backgroundColor: semanticColors['background-primary'],
  }
})