import AsyncStorage from "@react-native-async-storage/async-storage/";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { TextInput, Button, DefaultTheme } from "react-native-paper";
import AppInput from "../Components/AppInput";
import AppLink from "../Components/AppLink";
import MainContext from "../MainContext";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { setAppUser, setUserToken, setIsUserLoggedIn } =
    useContext(MainContext);

  async function saveUserInfoInStorage(response) {
    try {
      await AsyncStorage.setItem("appUser", JSON.stringify(response.data.user));
      await AsyncStorage.setItem(
        "appAuthToken",
        JSON.stringify(response.data.token)
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit() {
    try {
      if (!email) {
        return alert("Please enter email address / phone no");
      }
      if (!password) {
        return alert("Please enter password");
      }
      setIsLoggingIn(true);
      const response = await axios.post("/login", { email, password });
      if (response.data.user) {
        setIsLoggingIn(false);
        setIsUserLoggedIn(true);
        setAppUser(response.data.user);
        setUserToken(response.data.token);
        saveUserInfoInStorage(response);
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
        console.log(response.data);
      } else {
        setIsLoggingIn(false);
        alert(response.data);
      }
    } catch (error) {
      setIsLoggingIn(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.appLogo}>
        <Image
          style={{ width: 40, height: 40 }}
          source={require("../assets/icon.png")}
        />
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Login
        </Text>
      </View>
      <AppInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        mode="flat"
        label="Enter email / phone no"
      />
      <AppInput
        secureTextEntry={isPasswordHidden}
        right={
          <TextInput.Icon
            onPress={() => setIsPasswordHidden((prev) => !prev)}
            name={isPasswordHidden ? "eye" : "eye-off"}
          />
        }
        mode="flat"
        label="Enter password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Button
        icon="login"
        mode="contained"
        onPress={handleSubmit}
        disabled={isLoggingIn}
      >
        {isLoggingIn ? "Logging in..." : "Login"}
      </Button>
      <Text style={{ textAlign: "center", marginTop: 16 }}>
        Don't have an account?{" "}
        <AppLink onPress={() => navigation.navigate("Register")}>
          Register
        </AppLink>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  appLogo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    overflow: "hidden",
  },
});
