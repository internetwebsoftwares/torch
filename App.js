import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, StatusBar, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import { useStorage } from "@ugenc/use-storage-hook";
import { DefaultTheme } from "react-native-paper";
import MainContext from "./src/MainContext";

export default function App() {
  return (
    <View>
      <Text>App</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },
});
