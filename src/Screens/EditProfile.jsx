import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppInput from "../Components/AppInput";
import AppButton from "../Components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PageLoading } from "../Components/Loading";
import axios from "axios";
import MainContext from "../MainContext";

let user = {};

async function loadUserData() {
  try {
    const result = await AsyncStorage.getItem("appUser");
    const { firstName, lastName, phoneNumber } = JSON.parse(result);
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
  } catch (error) {
    console.log(error);
  }
}

export default function EditProfile() {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [isUpdating, setIsUpdating] = useState(false);
  const { userToken } = useContext(MainContext);

  async function handleUpdate() {
    if (!firstName) return alert("Please enter firstname");
    if (!lastName) return alert("Please enter lastname");
    if (!phoneNumber) return alert("Please enter phone number");
    if (phoneNumber.length < 10) return alert("Invalid phone number");
    try {
      setIsUpdating(true);
      const response = await axios.put(
        "/user/profile/update",
        {
          firstName,
          lastName,
          phoneNumber,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      setIsUpdating(false);
      const storedAppUser = await AsyncStorage.getItem("appUser");
      let parsedAppUser = JSON.parse(storedAppUser);
      if (response.data === "Profile updated") {
        await AsyncStorage.setItem(
          "appUser",
          JSON.stringify({
            firstName,
            lastName,
            phoneNumber,
            ...parsedAppUser,
          })
        );
        alert(response.data);
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  loadUserData();

  if (isUpdating) {
    return <PageLoading text="Updating profile..." />;
  }

  return (
    <ScrollView style={{ padding: 12 }}>
      <AppInput
        mode="flat"
        label="Firstname"
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
      />
      <AppInput
        mode="flat"
        label="Lastname"
        onChangeText={(text) => setLastName(text)}
        value={lastName}
      />
      <AppInput
        mode="flat"
        keyboardType="numeric"
        label="Phone number"
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
      />
      <AppButton onPress={handleUpdate} mode="contained">
        Update profile
      </AppButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
