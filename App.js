import React, { useEffect, useState } from "react";
import { StyleSheet, Platform, StatusBar, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import TabNavigator from "./src/Navigations/TabNavigator";
import { DefaultTheme } from "react-native-paper";
import navigationTheme from "./src/Navigations/navigationTheme";
import MainContext from "./src/MainContext";

axios.defaults.baseURL = "http://api-sell-it.herokuapp.com";

export default function App() {
  const [appUser, setAppUser] = useState({});
  const [userToken, setUserToken] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState();

  useEffect(() => {
    getAppUser();
    getUserToken();
  }, [appUser, isUserLoggedIn]);

  async function getAppUser() {
    try {
      const result = await AsyncStorage.getItem("appUser");
      setAppUser(JSON.parse(result));
      setIsUserLoggedIn(userToken ? true : false);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserToken() {
    try {
      const result = await AsyncStorage.getItem("appAuthToken");
      setUserToken(JSON.parse(result));
    } catch (error) {
      console.log(error);
    }
  }

  async function clearStorage() {
    await AsyncStorage.removeItem("appUser");
    await AsyncStorage.removeItem("appAuthToken");
    setIsUserLoggedIn(false);
  }

  // clearStorage();

  return (
    <NavigationContainer theme={navigationTheme}>
      <MainContext.Provider
        value={{
          appUser,
          setAppUser,
          userToken,
          setUserToken,
          isUserLoggedIn,
          setIsUserLoggedIn,
        }}
      >
        <StatusBar style="auto" />
        <TabNavigator iconSize={24} iconColor={DefaultTheme.colors.primary} />
      </MainContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },
});
