import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DefaultTheme } from "react-native-paper";

export default function AppList({ text, onPress, icon, color }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.listItem}>
      <Text
        style={{ color: color === "red" ? DefaultTheme.colors.error : "#000" }}
      >
        {text}
      </Text>
      {icon !== "no" && (
        <MaterialCommunityIcons name="chevron-right" size={28} color="#aaa" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listGroup: {
    width: "100%",
    overflow: "hidden",
  },
  listItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderBottomColor: "#e6e6e6",
    borderStyle: "solid",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#000",
    height: 50,
  },
});
