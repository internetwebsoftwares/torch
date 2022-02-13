import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import AppInput from "../Components/AppInput";
import AppLink from "../Components/AppLink";
import MainContext from "../MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage/";

export default function Register({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { setAppUser, setUserToken, setIsUserLoggedIn } =
    useContext(MainContext);
  const [isRegistering, setIsRegistering] = useState(false);

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

  async function handleRegister() {
    setIsRegistering(true);
    try {
      const response = await axios.post("/register", {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });
      if (response.data.user) {
        setIsRegistering(false);
        setIsUserLoggedIn(true);
        setAppUser(response.data.user);
        setUserToken(response.data.token);
        saveUserInfoInStorage(response);
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
        console.log(response.data);
      } else {
        setIsRegistering(false);
        alert(response.data);
      }
    } catch (error) {
      console.log(error);
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
          Register
        </Text>
      </View>
      {pageNo === 1 && (
        <>
          <AppInput
            mode="flat"
            label="Enter FirstName"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <AppInput
            mode="flat"
            label="Enter LastName"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
          <AppInput
            mode="flat"
            label="Enter phone no"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="numeric"
          />
          <Button mode="contained" onPress={() => setPageNo(2)}>
            Next
          </Button>
        </>
      )}
      {pageNo === 2 && (
        <>
          <AppInput
            mode="flat"
            label="Enter email address"
            value={email}
            onChangeText={(text) => setEmail(text)}
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button icon="arrow-left" mode="text" onPress={() => setPageNo(1)}>
              Back
            </Button>
            <Button
              disabled={isRegistering}
              mode="contained"
              onPress={handleRegister}
            >
              {isRegistering ? "Creating account..." : "Register"}
            </Button>
          </View>
        </>
      )}

      <Text style={{ textAlign: "center", marginTop: 16 }}>
        Already have an account?{" "}
        <AppLink onPress={() => navigation.navigate("Login")}>Login</AppLink>
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
