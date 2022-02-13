import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OneProduct from "../Screens/OneProduct";
import Home from "../Screens/Home";
import SearchNavigator from "../Navigations/SearchNavigator";
import MessagesNavigator from "../Navigations/MessagesNavigator";
import { DefaultTheme, Searchbar } from "react-native-paper";
import { View, Text, Image } from "react-native";
import AppHeader from "../Components/AppHeader";

const Stack = createNativeStackNavigator();

export default function FeedNavigator() {
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
        options={{
          headerTitle: (props) => <AppHeader {...props} />,
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={({ route }) => ({ title: route.params.productName })}
        name="OneProduct"
        component={OneProduct}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Search"
        component={SearchNavigator}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Messages"
        component={MessagesNavigator}
      />
    </Stack.Navigator>
  );
}
