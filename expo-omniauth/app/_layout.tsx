import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { JsStack } from "../layouts/js-stack";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function Layout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <JsStack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
        },
        headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
        headerTitleStyle: {
          fontFamily: "SpaceMono",
        },
      }}
      initialRouteName="auth"
    >
      <JsStack.Screen name="auth" options={{ title: "Auth" }} />
      <JsStack.Screen name="home" options={{ title: "Home" }} />
    </JsStack>
  );
}
