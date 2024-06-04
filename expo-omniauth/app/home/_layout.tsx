import React from "react";
import { StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";

import { ThemedText } from "@/components/ThemedText";

import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome!</ThemedText>
      <HelloWave />
      <ThemedText type="subtitle">Step 1: Try it</ThemedText>
      <ThemedText>
        Edit{" "}
        <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to
        see changes. Press{" "}
        <ThemedText type="defaultSemiBold">
          {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
        </ThemedText>{" "}
        to open developer tools.
      </ThemedText>
      <ThemedText type="subtitle">Step 2: Explore</ThemedText>
      <ThemedText>
        Tap the Explore tab to learn more about what's included in this starter
        app.
      </ThemedText>
      <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
      <ThemedText>
        When you're ready, run{" "}
        <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to
        get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
        directory. This will move the current{" "}
        <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
        <ThemedText type="defaultSemiBold">app-example</ThemedText>.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
