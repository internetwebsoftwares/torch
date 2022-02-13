import { StyleSheet, View, Image } from "react-native";
import React, { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MainContext from "../MainContext";
import { useNavigation } from "@react-navigation/native";

export default function HeaderLogo({ props }) {
  const { isUserLoggedIn } = useContext(MainContext);
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: "96%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      {...props}
    >
      <Image
        style={{
          width: 72,
          height: 30,
          marginRight: 8,
        }}
        source={require("../assets/header-logo.png")}
      />
      <View style={{ flexDirection: "row" }}>
        <MaterialCommunityIcons
          style={{ marginRight: 16 }}
          name="magnify"
          size={24}
          onPress={() => navigation.navigate("Search")}
        />
        {isUserLoggedIn && (
          <MaterialCommunityIcons
            name="chat-processing-outline"
            size={24}
            onPress={() => navigation.navigate("Messages")}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
