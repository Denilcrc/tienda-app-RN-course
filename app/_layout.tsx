import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useThemeColor } from "../presentation/theme/hooks/use-theme-color";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const unstable_settings = {
  anchor: "(tabs)",
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");

  //? Use `useFonts` only if you can't use the config plugin.
  const [loaded, error] = useFonts({
    KanitRegular: require("../assets/fonts/Kanit-Regular.ttf"),
    KanitThin: require("../assets/fonts/Kanit-Thin.ttf"),
    KanitBold: require("../assets/fonts/Kanit-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    //ojo colocar el flex de 1
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: backgroundColor }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack screenOptions={{ headerShown: false }}>
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
