import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppInput from "../Components/AppInput";

export default function () {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ScrollView style={{ padding: 12 }}>
      <AppInput
        label="Title"
        placeholder="eg: 32 inches LED TV"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <AppInput
        label="Description"
        placeholder="eg: LED TV in extremely good condition"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <AppInput
        label="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={(text) => setPrice(text)}
      />
      <AppInput
        label="Contact phone number"
        value={contactPhoneNumber}
        keyboardType="numeric"
        onChangeText={(text) => setContactPhoneNumber(text)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
