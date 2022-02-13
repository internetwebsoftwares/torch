import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FeedNavigator from "./FeedNavigator";
import AddProducts from "../Screens/AddProducts";
import AddProductButton from "./AddProductButton";
import SettingsNavigator from "./SettingsNavigator";
import MainContext from "../MainContext";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ iconSize, iconColor }) {
  const { isUserLoggedIn } = useContext(MainContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: "#aaa",
        tabBarActiveTintColor: iconColor,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          headerShown: false,
          title: "Home",

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={iconSize}
              color={color}
              name="home-variant-outline"
            />
          ),
        }}
      />
      {isUserLoggedIn && (
        <Tab.Screen
          name="AddProduct"
          component={AddProducts}
          options={({ navigation }) => ({
            headerShown: false,
            tabBarLabel: "Add products",
            tabBarButton: () => (
              <AddProductButton
                onPress={() => navigation.navigate("AddProduct")}
              />
            ),
          })}
        />
      )}

      <Tab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={iconSize}
              color={color}
              name="cog-outline"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
