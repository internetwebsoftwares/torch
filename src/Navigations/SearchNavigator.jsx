import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DefaultTheme } from "react-native-paper";
import SearchPage from "../Screens/SearchPage";

const Stack = createNativeStackNavigator();

export default function SearchNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: DefaultTheme.colors.primary,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "200",
        },
      }}
    >
      <Stack.Screen name="Search" component={SearchPage} />
    </Stack.Navigator>
  );
}
