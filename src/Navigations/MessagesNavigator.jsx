import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DefaultTheme } from "react-native-paper";
import NotificationsPage from "../Screens/NotificationsPage";

const Stack = createNativeStackNavigator();

export default function MessagesNavigator() {
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
      <Stack.Screen name="Messages" component={NotificationsPage} />
    </Stack.Navigator>
  );
}
