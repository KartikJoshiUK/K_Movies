import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Layout from "./src/Layout";
import "expo-dev-client";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout />
      <StatusBar style="inverted" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
