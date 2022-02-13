import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme } from "react-native-paper";

import Login from "../Screens/Login";
import Register from "../Screens/Register";
import SettingsPage from "../Screens/SettingsPage";
import AccountSecurity from "../Screens/AccountSecurity";
import EditProfile from "../Screens/EditProfile";
import ChangePassword from "../Screens/ChangePassword";

const Stack = createNativeStackNavigator();

export default function SettingsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "200",
        },
      }}
    >
      <Stack.Screen
        name="SettingsPage"
        options={{ title: "Settings" }}
        component={SettingsPage}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />

      <Stack.Screen
        options={{
          title: "Account Security",
        }}
        name="AccountSecurity"
        component={AccountSecurity}
      />

      <Stack.Screen
        options={{
          title: "Edit profile",
        }}
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        options={{
          title: "Change password",
        }}
        name="ChangePassword"
        component={ChangePassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
}
